var display=[];

function update_data() {
    console.log("Update");
    var request = {
        "aggs": {
            "types": {    
                "filter": {
                    "range": {
                        "@timestamp": {
                            "gte": "now-20s"
                        }
                    }
                },
                "aggs":{
                    "type_10s": {
                        "terms":{
                            "field":"_type"
                        }
                    }
                }
            }
        }
    };
    $.ajax({
        type:"POST",
        url:"http://localhost:9200//topbeat-*/_search?search_type=count",
        data: JSON.stringify(request),
        success: function(data) {
            console.log(data);
            display = [];
            data.aggregations.types.type_10s.buckets.forEach(function(item) {
                console.log(item);
                display.push({key:item.key,count:item.doc_count});
            });
        }
    });
}

function setup() {
    window.setInterval(update_data,1000);
    createCanvas(640, 480);
}

function draw() {
    var loffset = 5;
    var toffset = 5;
    var h = 15;
    background(255);
    noFill();

    for (var i=0; i<display.length; i++) {
        fill(0, 102, 153);
        rect(loffset,(h+5)*i+toffset,display[i].count,h);
        fill(0, 0, 0);
        text(display[i].key, loffset+display[i].count+5,toffset+20*i+12);
        
    }
}