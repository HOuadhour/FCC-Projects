const data = [
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json",
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json",
];

Promise.all(data.map((url) => d3.json(url))).then((data) => {
  setup(data);
  window.addEventListener("resize", () => {
    document.querySelector("svg").remove();
    setup(data);
  });
});

function setup(data) {
  const counties = topojson.feature(data[1], data[1].objects.counties);

  const canvas = document.querySelector(".canvas");
  const width = 1000;
  const height = 600;

  const margin = { top: 20, right: 10, bottom: 30, left: 50 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const pathGenerator = d3.geoPath().projection(null);

  let scores = data[0].map((d) => d.bachelorsOrHigher);
  const [minScore, maxScore] = d3.extent(scores);
  const colorVariance = 8;
  const stepScore = maxScore / colorVariance;
  scores = d3.range(minScore, maxScore, stepScore);
  const legendX = d3.scalePoint().domain(scores).range([0, 350]);

  const legendAxis = d3
    .axisBottom(legendX)
    .tickFormat((d) => `${d.toFixed(1)}%`)
    .tickSize(20);

  const colorScale = d3
    .scaleThreshold()
    .domain(scores)
    .range(d3.schemePurples[colorVariance + 1]);

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const tooltip = d3.select(".canvas").append("div").attr("id", "tooltip");

  const chart = svg.append("g").attr("class", "chart");

  const legend = chart
    .append("g")
    .attr("id", "legend")
    .attr("transform", `translate(450, 0)`);

  legend
    .selectAll("rect")
    .data(scores)
    .enter()
    .append("rect")
    .attr("x", (d) => legendX(d))
    .attr("y", 20)
    .attr("width", (d) => legendX(scores[1]) - legendX(scores[0]))
    .attr("height", 15)
    .attr("fill", (d) => colorScale(d));

  legend
    .append("g")
    .attr("class", "axis")
    .call(legendAxis)
    .attr("transform", "translate(0, 20)")
    .select(".domain")
    .remove();

  chart
    .selectAll("path")
    .data(counties.features)
    .enter()
    .append("path")
    .attr("d", pathGenerator)
    .attr("class", "county")
    .attr("data-fips", (d) => d.id)
    .attr("data-education", (d) => {
      const result = data[0].filter((obj) => obj.fips === d.id);
      return result ? result[0].bachelorsOrHigher : -1;
    })
    .attr("fill", (d) => {
      const result = data[0].filter((obj) => obj.fips === d.id);
      return result ? colorScale(result[0].bachelorsOrHigher) : null;
    })
    .on("mouseover", (e, d) => {
      tooltip.style("opacity", "1");
      tooltip.html(() => {
        const result = data[0].filter((obj) => obj.fips === d.id);
        if (result) {
          return `${result[0].area_name}, ${result[0].state}: ${result[0].bachelorsOrHigher}`;
        }
      });
      tooltip.style("top", e.clientY + "px");
      tooltip.style("left", e.clientX + "px");
      tooltip.attr("data-education", () => {
        const result = data[0].filter((obj) => obj.fips === d.id);
        return result ? result[0].bachelorsOrHigher : -1;
      });
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", "0");
    });
  chart
    .append("path")
    .datum(
      topojson.mesh(data[1], data[1].objects.states, function (a, b) {
        return a !== b;
      })
    )
    .attr("class", "state")
    .attr("d", pathGenerator);
}
