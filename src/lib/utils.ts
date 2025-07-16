export function formatTime24(ts: number): string {
    const date = new Date(ts);
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  }

export function canScrollCallback(containerName: string, setCanScroll: (newCanScroll: "NONE"|"BOTH"|"UP"|"DOWN") => void, reversed: boolean = false){

  const div = document.getElementById(containerName);

  if(div){
      div.addEventListener('scroll', function() {
          console.log(`Scroll position of ${containerName}: ${this.scrollTop}`);
          
          let canScrollUp = true;
          let canScrollDown = true;

          if(reversed){
            if ((-1*this.scrollTop) + this.clientHeight >= this.scrollHeight-20) {
              console.log('Scrolled to top!');
              canScrollUp = false;
            }
            if (this.scrollTop >= 0) {
              console.log('Scrolled to bottom!');
              canScrollDown = false;
            }
          }
          else{
            if (this.scrollTop <= 0) {
              console.log('Scrolled to top!');
              canScrollUp = false;
            }
            if (this.scrollTop + this.clientHeight >= this.scrollHeight-20) {
              console.log('Scrolled to bottom!');
              canScrollDown = false;
            }
          }
          
          
          if(canScrollUp && canScrollDown){
              setCanScroll("BOTH")
          } else if(canScrollUp){
              setCanScroll("UP")
          } else if(canScrollDown){
              setCanScroll("DOWN")
          } else {
              setCanScroll("NONE")
          }
      });

      div.scrollBy({top: reversed ? -1 : 1});
      div.scrollBy({top: reversed ? 1 : -1});

  }
  else {
      console.log(`${containerName} Not Found :/`)
  }
}