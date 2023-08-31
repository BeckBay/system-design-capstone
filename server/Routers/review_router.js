const { getReviews } = require('../Models/reviews.js');
const express = require('express');
const reviewsRouter = express.Router();

reviewsRouter.get('/:product_id/:sort/:count/:page', (req, res) => {
  const { product_id, sort, count, page } = req.params;


  const numericCount = parseInt(count, 10) || 5;
  const numericPage = parseInt(page, 10) || 1;
  const offset = (numericPage - 1) * numericCount;

  getReviews(product_id, sort || 'newest', numericCount, offset)
  .then((reviews) => {
      res.status(200).send(reviews);
  })
  .catch((err) => {
      console.error(err);
      res.status(500).send('Error fetching reviews.');
  });
});

module.exports = reviewsRouter;

// reviewsRouter.get('/meta/:product_id', (req, res) => {
//   axios.get(
//     path.join(process.env.API_URI, 'reviews/meta'),
//     {
//       params: {
//         product_id: req.params.product_id,
//       },
//     },
//   )
//     .then((reviewsMeta) => res.status(200).send(reviewsMeta.data))
//     .catch((err) => res.status(400).send(err));
// });

// reviewsRouter.post("/newreview",
//   utils.upload.array('imageFiles'),
//   (req, res) => {
//     utils.reviewsPoster(req.body, req.files)
//     .then((result) => res.status(200).send('Success.'))
//     .catch((err) => res.status(400).send(err));
//   }
// );

// reviewsRouter.put('/:review_id/helpful', (req, res) => {
//   axios.put(
//     path.join(process.env.API_URI, `reviews/${req.params.review_id}/helpful`),
//   )
//   .then((result) => res.status(200).send('Success.'))
//   .catch((err) => res.status(400).send(err));
// })

// reviewsRouter.put('/:review_id/report', (req, res) => {
//   axios.put(
//     path.join(process.env.API_URI, `reviews/${req.params.review_id}/report`),
//   )
//   .then((result) => res.status(200).send('Success.'))
//   .catch((err) => res.status(400).send(err));
// })

// module.exports = reviewsRouter;
