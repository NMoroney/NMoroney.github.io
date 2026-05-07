/**
 * ZIP Code Highlighter using D3.js
 * Replaces the Streamlit/Python implementation.
 */

async function initZipHighlighter(containerId, dataUrl) {
    const margin = { top: 40, right: 40, bottom: 60, left: 60 };
    const width = 600 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const svg = d3.select(containerId)
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

    // Loading data
    const data = await d3.tsv(dataUrl, (d) => ({
        zip: +d.zip,
        lat: +d.latitude,
        lon: +d.longitude
    }));

    // Filter out invalid data if any
    const cleanData = data.filter(d => !isNaN(d.lat) && !isNaN(d.lon));

    const x = d3.scaleLinear()
        .domain(d3.extent(cleanData, d => d.lon))
        .range([0, width]);

    const y = d3.scaleLinear()
        .domain(d3.extent(cleanData, d => d.lat))
        .range([height, 0]);

    // Background points
    const points = svg.append("g")
        .selectAll("circle")
        .data(cleanData)
        .enter()
        .append("circle")
        .attr("cx", d => x(d.lon))
        .attr("cy", d => y(d.lat))
        .attr("r", 2.0)   // 1.5
        .attr("fill", d => {
            const gray = d.zip / 110000;
            return `rgba(${gray * 255}, ${gray * 255}, ${gray * 255}, 0.2)`;
        });

    // Highlight group
    const highlightLayer = svg.append("g");

    // Slider setup
    const slider = d3.select("#zip-slider")
        .attr("min", cleanData[0].zip)
        .attr("max", cleanData[cleanData.length - 1].zip)
        .attr("value", cleanData[Math.floor(cleanData.length / 2)].zip);

    const zipDisplay = d3.select("#zip-range-display");

    const bisect = d3.bisector(d => d.zip).left;

    function updateHighlight(targetZip) {
        const idx = bisect(cleanData, targetZip);
        const step = 250;
        const n1 = Math.max(0, idx - step);
        const n2 = Math.min(cleanData.length - 1, idx + step);

        const highlightedData = cleanData.slice(n1, n2 + 1);

        const highlights = highlightLayer.selectAll("circle")
            .data(highlightedData, d => d.zip);

        highlights.exit().remove();

        highlights.enter()
            .append("circle")
            .attr("cx", d => x(d.lon))
            .attr("cy", d => y(d.lat))
            .attr("r", 3)  // 2
            .merge(highlights)
            .attr("fill", "rgba(242, 140, 25, 0.8)"); // #F28C19

        zipDisplay.text(`Range: ${cleanData[n1].zip} - ${cleanData[n2].zip}`);
    }

    slider.on("input", function() {
        updateHighlight(+this.value);
    });

    // Initial highlight
    updateHighlight(cleanData[Math.floor(cleanData.length / 2)].zip);

    // Axes
    svg.append("g")
        .attr("transform", `translate(0,${height})`)
        .call(d3.axisBottom(x));

    svg.append("g")
        .call(d3.axisLeft(y));

    // Labels
    svg.append("text")
        .attr("x", width / 2)
        .attr("y", height + 40)
        .attr("text-anchor", "middle")
        .text("Longitude");

    svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -height / 2)
        .attr("y", -40)
        .attr("text-anchor", "middle")
        .text("Latitude");

    svg.append("text")
        .attr("x", width / 2)
        .attr("y", -10)
        .attr("text-anchor", "middle")
        .style("font-size", "16px")
        .style("font-weight", "bold")
        .text("Contiguous US States");
}
