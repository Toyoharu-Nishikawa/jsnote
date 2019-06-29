const main = async ()=>{
  const module1 = await import("/jsnote/sample/public/module/export_test1.js")
  const module2 = await import("/jsnote/sample/public/module/export_test2.js")
  console.log(module1.func1(3))
  console.log(module1.func2(3))
  console.log(module2.func1(3))
  console.log(module2.func2(3))
}
main()