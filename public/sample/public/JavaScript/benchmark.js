// speed test
// elapsed time to convert double square array to single
// by 3 methods

const num = Array.from(Array(9),(k,i)=>i+1);
const exp = Array.from(Array(4),(k,i)=>10**i);
const list = [].concat(...Array.from(exp, k=>num.map(l=>k*l)));
const sampleSizeList = list.slice(1,30);
console.log(sampleSizeList)

const setData = sampleSize => {
  const start = performance.now();
  const data = Array.from(Array(sampleSize), k=>Array.from(Array(sampleSize),l=>0));
  const end = performance.now();
  const elapsedTime = (end-start);
  console.log(`set ${sampleSize} : ${elapsedTime}`);
  return data;
};

const method1 = data => {
  const start = performance.now();
  const list = [];
  for(let i=0;i<data.length;i=i+1){
    for(let j=0;j<data[i].length;j=j+1){
      list.push(data[i][j]);
    }
  }
  const end = performance.now();
  const elapsedTime = end-start; 
  return elapsedTime;
};

const method2 = data =>{
  const start = performance.now();
  const list =[].concat(...data); 
  const end = performance.now();
  const elapsedTime = end-start; 
  return elapsedTime;
};

const speedTest = (data, method) =>{
  const elapsedTime = method(data);
  console.log(`size ${data.length} : ${elapsedTime} ms`);
  return elapsedTime; 
};

const go = ()=>{
  console.log("set test data");
  const data = sampleSizeList.map(k=>setData(k));
  
  console.log("start speed test");
  const times = data.reduce((p1,c1) =>{
    const N =100;
    const time = Array.from(Array(N)).reduce((p2,c2)=>{
      p2.m1 += speedTest(c1, method1 );
      p2.m2 += speedTest(c1, method2 );
      return p2;
    },{m1:0, m2:0}); 
    time.m1 /= N;
    time.m2 /= N;
    p1.method1.push(time.m1); 
    p1.method2.push(time.m2); 
    return p1;
  },{method1:[], method2:[]});
  
  console.log("end speed test");
  
  const result = {
   test: "convert double squre array to single array", 
   sampleSize: sampleSizeList, 
   method1: times.method1, 
   method2: times.method2, 
  }; 
  
  for(let method in times){
    times[method].forEach((k,i)=>{
      const elem = document.createElement("li");
      elem.textContent = `${method} size ${sampleSizeList[i]} : ${k} ms`;
      document.getElementById("draw").appendChild(elem);
    });
  }
  return result;
};

const result =go();
exportText = JSON.stringify(result, null, "  ");
