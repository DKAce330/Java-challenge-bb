//Starting with url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"
function init() {

    // Dropdown menu
    let dropdownMenu = d3.select("#selDataset");

    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        let names = data.names;
        names.forEach((name) => {
            dropdownMenu.append("option").text(name).property("value", name);
        });

        // Assign to variables
        let name = names[0];

        // Functions to create charts
        demo(name);
        bar(name);
        bubble(name);
    });
}

// Demographics panel
function demo(selection) {
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        let metadata = data.metadata;
        let filteredData = metadata.filter((meta) => meta.id == selection);
      
        // Assign to variable
        let obj = filteredData[0]
        d3.select("#sample-metadata").html("");
        let entries = Object.entries(obj);
        entries.forEach(([key,value]) => {
            d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
        });

        console.log(entries);
    });
  }
  

// Bar chart
function bar(selection) {
    d3.json(url).then((data) => {
        console.log(`Data: ${data}`);
        let samples = data.samples;
        let filteredData = samples.filter((sample) => sample.id === selection);
        let obj = filteredData[0];
        let trace = [{
            x: obj.sample_values.slice(0,10).reverse(),
            y: obj.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
            text: obj.otu_labels.slice(0,10).reverse(),
            type: "bar",
            marker: {
                color: "rgb(74,103,65)"
            },
            orientation: "h"
        }];
        
        Plotly.newPlot("bar", trace);
    });
}
  
// Bubble chart
function bubble(selection) {
    d3.json(url).then((data) => {
        let samples = data.samples; 
        let filteredData = samples.filter((sample) => sample.id === selection);
    
        let obj = filteredData[0];
        let trace = [{
            x: obj.otu_ids,
            y: obj.sample_values,
            text: obj.otu_labels,
            mode: "markers",
            marker: {
                size: obj.sample_values,
                color: obj.otu_ids,
                colorscale: "Greens"
            }
        }];
        let layout = {
            xaxis: {title: "OTU ID"}
        };
        Plotly.newPlot("bubble", trace, layout);
    });
}

// Starting optional gauge section before and after class

// Refresh charts when selection changes
function refresh(selection) {
    demo(selection);
    bar(selection);
    bubble(selection);
    //gauge(selection);
}

init();