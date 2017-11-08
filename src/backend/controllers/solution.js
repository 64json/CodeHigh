import Router from './CodeHighRouter';
import { Solution } from '/models';

const router = Router(Solution, 'solution', 'solutions');

const rateSolution = (req, res, next) => {
  const { solution_id } = req.params;
  const { stars } = req.body;
  Solution.get(solution_id)
    .then(solution => solution.rate(stars, req.author))
    .then(solution => res.return({ solution }))
    .catch(next);
};

router.route('/:solution_id/rate')
  .post(rateSolution);

export default router;