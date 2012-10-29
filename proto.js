console.log(phantom.arg);
phantom.arg = {"hello":"world!"};
console.log(JSON.stringify(phantom.arg));
phantom.exit(0);
