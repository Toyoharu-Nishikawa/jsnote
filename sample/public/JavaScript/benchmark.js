// speed test
// elapsed time to convert double square array to single
// by 3 methods

const num = Array.from(Array(9),(k,i)=>i+1);
const exp = Array.from(Array(4),(k,i)=>10**i);
const list = [].concat(...Array.from(exp, k=>num.map(l=>k*l)));
const sampleSizeList = list.slice(1,30);
console.log(sampleSizeList);

const setData = sampleSize => {
  const start = performance.now();
  const data = Array.from(Array(sampleSize), k=>Array.from(Array(sampleSize),l=>0));
  const end = performance.now();
  const elapsedTime = (end-start);
  console.log(`set ${sampleSize} : ${elapsedTime}`);
  return data;
};

const method1 = (data,iter) => {
  const start = performance.now();
  for(let n=0;n<iter;n++){
    const list = [];
    for(let i=0;i<data.length;i=i+1){
      for(let j=0;j<data[i].length;j=j+1){
        list.push(data[i][j]);
      }
    }
  }
  const end = performance.now();
  const average = (end-start)/iter; 
  return average;
};

const method2 = (data, iter) =>{
  const start = performance.now();
  for(let n=0;n<iter;n++){
    const list =[].concat(...data); 
  }
  const end = performance.now();
  const average = (end-start)/iter; 
  return average;
};

const method3 = (data, iter) =>{
  const start = performance.now();
  for(let n=0;n<iter;n++){
    const list =[];
    Array.prototype.push.apply(list,...data); 
  }
  const end = performance.now();
  const average = (end-start)/iter; 
  return average;
};

const speedTest = (data, iter, method) =>{
  const elapsedTime = method(data,iter);
  console.log(`size ${data.length} : ${elapsedTime} ms`);
  return elapsedTime; 
};

const go = ()=>{
  console.log("set test data");
  const data = sampleSizeList.map(k=>setData(k));
  console.log("start speed test of method1");
  const method1Test = data.map(k=>speedTest(k,100,method1)); 
  
  console.log("start speed test of method2");
  const method2Test = data.map(k=>speedTest(k,100,method2)); 
  console.log(method2Test);
  
  console.log("start speed test of method3");
  const method3Test = data.map(k=>speedTest(k,100,method3)); 
  console.log(method3Test);
  
  const result = {
   test: "convert double squre array to single array", 
   sampleSize: sampleSizeList, 
   method1: method1Test, 
   method2: method2Test, 
   method3: method3Test, 
  }; 
  return result;
};

const result =go();
exportText = JSON.stringify(result, null, "  ");
