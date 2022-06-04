
            var num;
            function loadUp() {
                
                var site = new XMLHttpRequest();
                site.onreadystatechange = function() {
                    if(this.readyState == 4 && this.status == 200) {
                        var x = JSON.parse(this.responseText);
                        num = x.length;

                        document.getElementById("imageCounter").innerHTML = `${num} Photos`;
                        
                        x.forEach((obj) => {
                            
                        document.getElementById("instance").innerHTML += `<div id=${obj.id} class="float-left Gallery" onclick="fadeImage(${obj.id})">
                            <img
                            src=${obj.url}
                            width="500"
                            height="350"
                            />
                            <div class="description">${obj.title}</div>
                            </div>`;
                        });
                    }
                };

                site.open("GET", "https://jsonplaceholder.typicode.com/albums/2/photos", true);
                site.send();
            }
            
            function fadeImage(id) {
                var fadeTarget = document.getElementById(id);
               removeFadeOut(fadeTarget,2000);
               var count = document.getElementById("imageCounter").innerHTML;
               var updated = parseInt(count) - 1;
               document.getElementById("imageCounter").innerHTML = updated+" Photos";
            }
            function removeFadeOut( el, speed ) {
                var seconds = speed/1000;
                el.style.transition = "opacity "+seconds+"s ease";

                el.style.opacity = 0;
                setTimeout(function() {
                    el.parentNode.removeChild(el);
                }, speed);
            }