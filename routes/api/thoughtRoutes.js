const router = require('express').Router();

const { getThoughts, getSingleThought, createThought, updateThought, deleteThought } = require('../../controllers/thoughtController');
const { createReaction, deleteReaction} = require('../../controllers/reactionController');

router.route('/').get(getThoughts).post(createThought);

router.route('/:thoughtId').get(getSingleThought).put(updateThought).delete(deleteThought);

router.route('/:thoughtId/reactions').post(createReaction).delete(deleteReaction);

module.exports = router;