async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json";

getData(url).then((data) => {
  setup(data.monthlyVariance, data.baseTemperature);
  window.addEventListener("resize", () => {
    document.querySelector("svg").remove();
    document.querySelector("#tooltip").remove();
    setup(data.monthlyVariance, data.baseTemperature);
  });
});

function getMonth(num) {
  return d3.timeFormat("%B")(new Date(2020, num));
}

function getRanges(num, max) {
  const step = max / num;
  let temp = step;
  const ranges = [Number(temp.toFixed(1))];

  for (let i = 1; i < num; i++) {
    temp += step;
    ranges.push(Number(temp.toFixed(1)));
  }

  return ranges;
}

function getColor(num, ranges) {
  const colors = [
    "#D5E5FF",
    "#80B3FF",
    "#D3BC5F",
    "#FF7F2A",
    "#D35F5F",
    "#D40000",
  ];

  for (let i = 0; i < ranges.length; i++) {
    if (num <= ranges[i]) {
      return colors[i];
    }
  }

  return colors[5];
}

function setup(dataset, base) {
  const canvas = document.querySelector(".canvas");
  const margin = { top: 20, right: 30, bottom: 120, left: 90 };
  const width = canvas.offsetWidth - margin.left - margin.right;
  const height = canvas.clientHeight - margin.top - margin.bottom;
  const cellWidth = width / parseInt(dataset.length / 12);
  const cellHeight = height / 12;

  const yearsDate = dataset.map((d) => new Date(String(d.year)));
  const variances = dataset.map((d) => Number((base + d.variance).toFixed(1)));
  const maxTemp = d3.max(variances);
  const ranges = getRanges(5, maxTemp);

  const months = d3.range(0, 12).map((i) => getMonth(i));

  const minYear = new Date(d3.min(yearsDate));
  // minYear.setFullYear(minYear.getFullYear() - 1);

  const maxYear = new Date(d3.max(yearsDate));
  maxYear.setFullYear(maxYear.getFullYear() + 1);

  const x = d3.scaleTime().domain([minYear, maxYear]).range([0, width]);
  const y = d3.scaleBand().domain(months).range([0, height]);
  const legendX = d3
    .scalePoint()
    .domain([0, ...ranges])
    .range([0, 250]);

  const xAxis = d3.axisBottom(x);
  const yAxis = d3.axisLeft(y);
  const legendAxis = d3.axisBottom(legendX);

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
    .attr("class", "cell")
    .attr("width", cellWidth)
    .attr("height", cellHeight)
    .attr("x", (d, i) => x(new Date(d.year, 0)))
    .attr("y", (d, i) => y(getMonth(d.month - 1)))
    .attr("data-year", (d, i) => String(d.year))
    .attr("data-month", (d, i) => String(d.month - 1))
    .attr("data-temp", (d, i) => variances[i])
    .style("fill", (d, i) => getColor(variances[i], ranges))
    .on("mouseover", (e, d) => {
      tooltip.style("opacity", "1");
      tooltip.html(
        `${getMonth(d.month - 1)} ${d.year}
        <br>${(d.variance + base).toFixed(1)}°C
        <br>${d.variance.toFixed(1)}°C`
      );
      tooltip.style("top", e.offsetY + "px");
      tooltip.style("left", e.offsetX + 20 + "px");
      tooltip.attr("data-year", () => String(d.year));
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", "0");
    });

  const legend = chart
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(0, ${canvas.offsetHeight - 50})`);

  legend
    .selectAll("rect")
    .data([0, ...ranges])
    .enter()
    .append("rect")
    .attr("width", 250 / 5)
    .attr("height", 50)
    .attr("x", (d) => legendX(d))
    .attr("y", -50)
    .style("fill", (d, i) => getColor(d + 0.1, ranges));

  legend.append("g").attr("class", "axis").call(legendAxis);
}
