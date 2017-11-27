// Colored Boxes
// Author: Rahul Luthra

var colorBoxes = function () {

    var fillColorClass = '';

    var countcolor = 0;

    var gridrow = 0;

    var gridcol = 0;

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    function createCSSClass(color) {
        var style = document.createElement('style');
        style.type = 'text/css';
        style.innerHTML = '.c-' + color.substr(1, color.length - 1) + ' { background: ' + color + '; }';
        document.getElementsByTagName('head')[0].appendChild(style);
    }

    return {
        initiate: function (colorBoxes, row, col) {
            fillColorClass ="";
            countcolor = colorBoxes;
            gridrow = row;
            gridcol = col;
            this.drawColorBoxes();
            this.drawFillGrid();
            this.addEvents();
        },
        updateGrid: function () {
            this.initiate(8, parseInt(document.getElementsByClassName("rownum")[0].value), parseInt(document.getElementsByClassName("colnum")[0].value));
        },
        drawColorBoxes: function () {
            var html = '<div class="addnew">+</div>';
            var that = this;
            for (let i = 0; i < countcolor; i++) {
                let color = getRandomColor();
                createCSSClass(color);
                html += '<div class="color c-' + color.substr(1, color.length - 1) + '"></div>';
            }
            document.getElementsByClassName("color-container")[0].innerHTML = html;
        },
        drawFillGrid: function () {
            var html = '';
            for (let i = 0; i < gridrow; i++) {
                html += '<div class="row">';
                for (let j = 0; j < gridcol; j++) {
                    html += '<div class="color"></div>';
                }
                html += '</div>';
            }
            document.getElementsByClassName("fill-container")[0].innerHTML = html;
        },
        addColorBox: function () {
            var html = document.getElementsByClassName("color-container")[0].innerHTML;
            let color = getRandomColor();
            createCSSClass(color);
            html += '<div class="color c-' + color.substr(1, color.length - 1) + '"></div>';
            document.getElementsByClassName("color-container")[0].innerHTML = html;
            this.addEvents();
        },
        addEvents: function () {
            var colors = document.getElementsByClassName("color");
            for (var i in colors) {
                (function (j) {
                    j = parseInt(j);
                    if (!isNaN(j)) {
                        colors[j].addEventListener("click", function () {
                            if (this.parentElement.className == "color-container") {
                                fillColorClass = this.className.split(" ")[1];
                            } else {
                                this.className = "color " + fillColorClass;
                            }
                        })
                    }
                })(i);
            }

            //Add New Color
            document.getElementsByClassName("addnew")[0].addEventListener("click", function () {
                colorBoxes.addColorBox();
            });
        }
    }
}();

colorBoxes.initiate(8, 3, 3);