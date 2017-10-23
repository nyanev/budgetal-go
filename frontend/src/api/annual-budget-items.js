import {_get, _put, _post} from 'api';

export function AllAnnualBudgetItemsRequest(year) {
  return _get(`/annual-budgets/${year}`);
}

export function CreateAnnualBudgetItemRequest(item) {
  return _post('/annual-budget-items', item);
}

export function UpdateAnnualBudgetItemRequest(item) {
  return _put('/annual-budget-items', item);
}