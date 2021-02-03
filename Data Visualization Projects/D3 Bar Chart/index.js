async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

getData(url).then((data) => {
  setup(data.data);
  window.addEventListener("resize", () => {
    document.querySelector("svg").remove();
    document.querySelector("#tooltip").remove();
    setup(data.data);
  });
});

function setup(dataset) {
  const canvas = document.querySelector(".canvas");
  const margin = { top: 20, right: 10, bottom: 30, left: 50 };
  const width = canvas.offsetWidth - margin.left - margin.right;
  const height = canvas.clientHeight - margin.top - margin.bottom;

  const barWidth = width / dataset.length;
  const yearsDate = dataset.map((d) => new Date(d[0]));
  const gdp = dataset.map((d) => d[1]);

  const minYear = d3.min(yearsDate);
  const maxYear = new Date(d3.max(yearsDate));
  maxYear.setMonth(maxYear.getMonth() + 3);

  const maxGDP = d3.max(gdp);

  const x = d3.scaleTime().domain([minYear, maxYear]).range([0, width]);

  const y = d3.scaleLinear().domain([0, maxGDP]).range([height, 0]);

  const linearScale = d3.scaleLinear().domain([0, maxGDP]).range([0, height]);

  const yAxis = d3.axisLeft(y);
  const xAxis = d3.axisBottom(x);

  if (width >= 900) xAxis.ticks(40);
  if (height >= 700) yAxis.ticks(20);

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", canvas.offsetWidth)
    .attr("height", canvas.offsetHeight);

  const tooltip = d3.select(".canvas").append("div").attr("id", "tooltip");

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  chart.append("g").attr("id", "y-axis").attr("class", "axis").call(yAxis);
  chart
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chart
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("width", barWidth)
    .attr("height", (d, i) => linearScale(d[1]))
    .attr("x", (d, i) => x(yearsDate[i]))
    .attr("y", (d, i) => y(d[1]))
    .attr("class", "bar")
    .attr("data-gdp", (d) => d[1])
    .attr("data-date", (d) => d[0])
    .on("mouseover", (e, d) => {
      tooltip.style("opacity", "1");
      tooltip.html(`Period: ${d[0]}<br>GDP: \$${d[1]}`);
      tooltip.style("left", e.clientX - 200 + "px");
      tooltip.style("top", e.clientY - 200 + "px");
      // tooltip.style("");
      tooltip.attr("data-date", d[0]);
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", "0");
      // tooltip.style("display", "none");
    });
}
