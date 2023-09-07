module.exports = {
  generateRandomProduct: (context, events, callback) => {
    console.log('Callback:', callback);

    if (!context.vars) {
      context.vars = {};
    }

    context.vars.productId = Math.floor(Math.random() * 5000) + 1;
    console.log('Generated productId:', context.vars.productId);
    return callback;

  }



  // generateReviewData: (context, events, done) => {
  //   context.vars.rating = Math.floor(Math.random() * 5) + 1;  // Generating a random rating between 1 and 5
  //   context.vars.summary = "Test Review Summary";
  //   context.vars.body = "This is a test review body";
  //   // ... and so on for other fields.
  //   return done();
  // }
};
