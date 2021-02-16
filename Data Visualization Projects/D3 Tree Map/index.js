d3.json(
  "https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json"
).then(setup);

function setup(data) {
  const margin = {
    top: 0,
    right: 200,
    bottom: 0,
    left: 0,
  };
  const width = document.querySelector(".canvas").clientWidth;
  const height = document.querySelector(".canvas").clientHeight;

  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  const legendRect = { width: 60, height: 60, spacing: 10 };

  const tooltip = d3.select(".canvas").append("div").attr("id", "tooltip");

  const svg = d3
    .select(".canvas")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  const root = d3.hierarchy(data).sum((d) => d.value);

  const treemap = d3.treemap().size([innerWidth, innerHeight]).padding(2);
  treemap(root);

  const colorScale = d3.scaleOrdinal(d3.schemeCategory10);

  const cell = svg
    .selectAll("g")
    .data(root.leaves())
    .enter()
    .append("g")
    .attr("transform", (d) => `translate(${d.x0}, ${d.y0})`);

  cell
    .append("rect")
    .attr("class", "tile")
    .attr("data-name", (d) => d.data.name)
    .attr("data-category", (d) => d.data.category)
    .attr("data-value", (d) => d.data.value)
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0)
    .attr("fill", (d) => colorScale(d.data.category))
    .on("mouseover", (e, d) => {
      tooltip.style("opacity", "1");
      tooltip.html(() => {
        return `Name: ${d.data.name}<br>Genre: ${
          d.data.category
        }<br>Revenue: $${d3.format("s")(d.value).replace("G", "B")}`;
      });
      tooltip.style("top", e.clientY + "px");
      tooltip.style("left", e.clientX + "px");
      tooltip.attr("data-value", () => d.data.value);
    })
    .on("mouseout", (e, d) => {
      tooltip.style("opacity", "0");
    });

  cell
    .append("text")
    .text((d) => d.data.name)
    .attr("x", (d) => (d.x1 - d.x0) / 2)
    .attr("y", 20)
    .attr("class", "innerText")
    .attr("width", (d) => d.x1 - d.x0)
    .attr("height", (d) => d.y1 - d.y0);

  d3.selectAll(".innerText").call(wrap);

  const categories = root.ancestors()[0].data.children.map((d) => d.name);

  const legend = d3
    .select("svg")
    .append("g")
    .attr("transform", `translate(${innerWidth}, 5)`)
    .attr("id", "legend");

  const legendItemGroup = legend
    .selectAll("g")
    .data(categories)
    .enter()
    .append("g")
    .attr(
      "transform",
      (d, i) => `translate(10, ${i * (legendRect.height + legendRect.spacing)})`
    );

  legendItemGroup
    .append("rect")
    .attr("width", legendRect.width)
    .attr("height", legendRect.height)
    .attr("fill", colorScale)
    .attr("class", "legend-item");

  legendItemGroup
    .append("text")
    .text((d) => d)
    .attr("class", "legendText")
    .attr("x", legendRect.width + legendRect.spacing)
    .attr("y", (legendRect.height + legendRect.spacing) / 2);
}

// Taken from https://codepen.io/goodforenergy/pen/XgNWpR?editors=0010
function wrap(text) {
  text.each(function () {
    var text = d3.select(this);
    var words = text.text().split(/\s+/).reverse();
    var lineHeight = 20;
    var width = parseFloat(text.attr("width"));
    var y = parseFloat(text.attr("y"));
    var x = text.attr("x");
    var anchor = text.attr("text-anchor");

    var tspan = text
      .text(null)
      .append("tspan")
      .attr("x", x)
      .attr("y", y)
      .attr("text-anchor", anchor);
    var lineNumber = 0;
    var line = [];
    var word = words.pop();

    while (word) {
      line.push(word);
      tspan.text(line.join(" "));
      if (tspan.node().getComputedTextLength() > width) {
        lineNumber += 1;
        line.pop();
        tspan.text(line.join(" "));
        line = [word];
        tspan = text
          .append("tspan")
          .attr("x", x)
          .attr("y", y + lineNumber * lineHeight)
          .attr("anchor", anchor)
          .text(word);
      }
      word = words.pop();
    }
  });
}
