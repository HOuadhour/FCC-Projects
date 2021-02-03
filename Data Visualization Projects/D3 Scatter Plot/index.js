async function getData(url) {
  const response = await fetch(url);
  return response.json();
}

const url =
  "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json";

getData(url).then((data) => {
  setup(data);
  window.addEventListener("resize", () => {
    document.querySelector("svg").remove();
    document.querySelector("#tooltip").remove();
    setup(data);
  });
});

function setup(dataset) {
  const canvas = document.querySelector(".canvas");
  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = canvas.offsetWidth - margin.left - margin.right;
  const height = canvas.clientHeight - margin.top - margin.bottom;

  const parseTime = d3.timeParse("%M:%S");
  const yearsDate = dataset.map((d) => new Date(String(d.Year)));
  const minutes = dataset.map((d) => {
    const parsedTime = d.Time.split(":");
    return new Date(Date.UTC(1970, 0, 1, 0, parsedTime[0], parsedTime[1]));
  });

  console.log(minutes);

  const minYear = new Date(d3.min(yearsDate));
  minYear.setFullYear(minYear.getFullYear() - 1);

  const maxYear = new Date(d3.max(yearsDate));
  maxYear.setFullYear(maxYear.getFullYear() + 1);

  const minY = d3.min(minutes);
  const maxY = d3.max(minutes);

  const x = d3.scaleTime().domain([minYear, maxYear]).range([0, width]);

  const y = d3.scaleTime().domain([minY, maxY]).range([0, height]);

  const yAxis = d3.axisLeft(y).tickFormat((d) => d3.timeFormat("%M:%S")(d));
  const xAxis = d3.axisBottom(x);

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", canvas.offsetWidth)
    .attr("height", canvas.offsetHeight);

  const tooltip = d3.select(".canvas").append("div").attr("id", "tooltip");

  const chart = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const legend = chart
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(${canvas.offsetWidth - 100}, ${height / 6})`);

  legend
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "#ffaa00")
    .attr("stroke", "#ffffff");
  legend
    .append("text")
    .text("No doping allegations")
    .attr("dy", "13")
    .attr("transform", "translate(-10, 0)");

  legend
    .append("rect")
    .attr("width", 20)
    .attr("height", 20)
    .attr("fill", "#181818")
    .attr("stroke", "#ffffff")
    .attr("transform", "translate(0, 40)");
  legend
    .append("text")
    .text("Riders with doping allegations")
    .attr("transform", "translate(-10, 40)")
    .attr("dy", "13");

  chart.append("g").attr("id", "y-axis").attr("class", "axis").call(yAxis);
  chart
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", `translate(0, ${height})`)
    .call(xAxis);

  chart
    .selectAll("circle")
    .data(dataset)
    .enter()
    .append("circle")
    .attr("cx", (d, i) => x(yearsDate[i]))
    .attr("cy", (d, i) => y(minutes[i]))
    .attr("r", 8)
    .attr("class", "dot")
    .attr("data-xvalue", (d, i) => String(d.Year))
    .attr("data-yvalue", (d, i) => minutes[i].toISOString())
    .style("fill", (d) => (d.Doping === "" ? "#ffaa00" : "#181818"))
    .on("mouseover", (e, d) => {
      tooltip.style("opacity", "1");
      tooltip.html(
        `Name: ${d.Name}
        <br>Nationality: ${d.Nationality}
        <br>Year: ${d.Year}
        <br>Time: ${d.Time}
        <br>Place: ${d.Place}
        ${d.Doping !== "" ? "<br>Doping: " + d.Doping : ""}`
      );
      tooltip.style("left", e.clientX - 200 + "px");
      tooltip.style("top", e.clientY - 200 + "px");
      tooltip.attr("data-year", () => String(d.Year));
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", "0");
    });
}
