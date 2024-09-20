import { useMutation, useQuery } from "@tanstack/react-query";
import { queryClient } from "../../config/reactQuery.config";
import { Button, Modal } from "@mantine/core";
import { useState } from "react";
import IncomeList from "./components/IncomeList/IncomeList";
import IncomeForm from "./components/IncomeForm/IncomeForm";
import apiFetcher from "../../services/api";

const createIncome = async (income, token) => {
  return await apiFetcher("incomes/", "POST", token, income);
};

const updateIncome = async (income, token) => {
  return await apiFetcher(`incomes/${income.id}/`, "PUT", token, income);
};

const deleteIncome = async (id, token) => {
  return await apiFetcher(`incomes/${id}/`, "DELETE", token);
};

const IncomePage = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentIncome, setCurrentIncome] = useState(null);
  const token = sessionStorage.getItem("authToken");

  const getIncomes = async () => await apiFetcher("incomes/", "GET", token);

  const { data: incomes } = useQuery({
    queryKey: ["incomes/"],
    queryFn: getIncomes,
  });

  const addIncomeMutation = useMutation({
    mutationFn: (income) => createIncome(income, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["incomes/"]);
    },
  });

  const updateIncomeMutation = useMutation({
    mutationFn: (income) => updateIncome(income, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["incomes/"]);
    },
  });

  const deleteIncomeMutation = useMutation({
    mutationFn: (id) => deleteIncome(id, token),
    onSuccess: () => {
      queryClient.invalidateQueries(["incomes/"]);
    },
  });

  const handleAddIncome = () => {
    setCurrentIncome(null);
    setModalOpen(true);
  };

  const handleEditIncome = (income) => {
    setCurrentIncome(income);
    setModalOpen(true);
  };

  const handleDeleteIncome = (id) => {
    deleteIncomeMutation.mutate(id);
    queryClient.invalidateQueries(["incomes/"]);
  };

  const handleSaveIncome = (income) => {
    if (income.id) {
      updateIncomeMutation.mutate(income);
    } else {
      addIncomeMutation.mutate(income);
    }
    setModalOpen(false);
  };

  return (
    <>
      <div className="mt-2 flex flex-col gap-2">
        <Button onClick={handleAddIncome}>Agregar</Button>
        <IncomeList
          data={incomes}
          onEdit={handleEditIncome}
          onDelete={handleDeleteIncome}
        />
      </div>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <IncomeForm
          income={currentIncome}
          onSave={handleSaveIncome}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </>
  );
};

export default IncomePage;
