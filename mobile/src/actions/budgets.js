import {
  BUDGET_LOADED,
  BUDGET_CATEGORY_UPDATED,
  BUDGET_ITEM_UPDATED,
  BUDGET_INCOME_UPDATED,
  BUDGET_ITEM_NEW,
  BUDGET_ITEM_SAVED,
  BUDGET_ITEM_DELETED,
  BUDGET_CATEGORY_IMPORTED,
} from 'redux-constants/action-types';

export const budgetLoaded = ({
  budget,
  budgetCategories,
  budgetItems,
  budgetItemExpenses,
}) => {
  return {
    type: BUDGET_LOADED,
    budget,
    budgetCategories,
    budgetItems,
    budgetItemExpenses,
  };
};

export const updateBudgetCategory = ({ budgetCategory }) => {
  return {
    type: BUDGET_CATEGORY_UPDATED,
    budgetCategory,
  };
};

export const updateIncome = income => {
  return {
    type: BUDGET_INCOME_UPDATED,
    income,
  };
};

export const updateBudgetItem = budgetItem => {
  return {
    type: BUDGET_ITEM_UPDATED,
    budgetItem,
  };
};

export const updateNullBudgetItem = budgetItem => {
  return {
    type: BUDGET_ITEM_SAVED,
    budgetItem,
  };
};

export const newBudgetItem = budgetCategoryId => {
  return {
    type: BUDGET_ITEM_NEW,
    budgetCategoryId,
  };
};

export const removeBudgetItem = budgetItem => {
  return {
    type: BUDGET_ITEM_DELETED,
    budgetItem,
  };
};

export const importedBudgetItems = budgetItems => {
  return {
    type: BUDGET_CATEGORY_IMPORTED,
    budgetItems,
  };
};
