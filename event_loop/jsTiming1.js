setTimeout(()=>console.log("A"),0);

console.log('B');

setTimeout(()=> console.log('C'),1000);
setTimeout(()=>console.log('D'),0);

let i=0;

while(i<1_000_000_000){//assume this takes ~500 ms
    let ignore = Math.sqrt(i);
    i++;
}

console.log('E')

// Overall output
// B - 1ms
// E - 501 ms
// A - 502 ms
// D - 502 ms
// C - 502ms

// after completing call stack tasks 
// , the event loop looks for more work to do. It checks the queue and sees that there are three tasks scheduled to happen.
// The order of items in the queue is based on the provided timer value and the order that the setTimeout() calls were made.