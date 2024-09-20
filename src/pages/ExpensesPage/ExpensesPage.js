import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import ExpensesList from "./components/ExpensesList/ExpensesList";
import ExpenseForm from "./components/ExpensesForm/ExpensesForm";
import apiFetcher from "../../services/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/reactQuery.config";

const createExpense = async (expense, token) => {
  return await apiFetcher("expenses/", "POST", token, expense);
};

const updateExpense = async (expense, token) => {
  return await apiFetcher(`expenses/${expense.id}/`, "PUT", token, expense);
};

const deleteExpense = async (id, token) => {
  return await apiFetcher(`expenses/${id}/`, "DELETE", token);
};

const ExpensesPage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);
  const token = sessionStorage.getItem("authToken");

  const getExpenses = async () => await apiFetcher("expenses/", "GET", token);

  const { data: expenses } = useQuery({
    queryKey: ["expenses/"],
    queryFn: getExpenses,
  });

  const addExpenseMutation = useMutation({
    mutationFn: (expense) => createExpense(expense, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses/"]);
    },
  });

  const updateExpenseMutation = useMutation({
    mutationFn: (expense) => updateExpense(expense, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses/"]);
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: (id) => deleteExpense(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["expenses/"]);
    },
  });

  const handleAddExpense = () => {
    setCurrentExpense(null);
    setModalOpen(true);
  };

  const handleEditExpense = (expense) => {
    setCurrentExpense(expense);
    setModalOpen(true);
  };

  const handleDeleteExpense = (id) => {
    deleteExpenseMutation.mutate(id);
    queryClient.invalidateQueries(["expenses/"]);
  };

  const handleSaveExpense = (expense) => {
    if (expense.id) {
      updateExpenseMutation.mutate(expense);
    } else {
      addExpenseMutation.mutate(expense);
    }
    setModalOpen(false);
  };
  return (
    <>
      <div className="mt-2 flex flex-col gap-2">
        <Button onClick={handleAddExpense}>Agregar</Button>
        <ExpensesList
          data={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      </div>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <ExpenseForm
          expense={currentExpense}
          onSave={handleSaveExpense}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default ExpensesPage;
