import {
  Button,
  Progress,
  Modal,
  Group,
  TextInput,
  Select,
} from "@mantine/core";
import React, { useState, useEffect } from "react";
import apiFetcher from "../../services/api";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const goalTypes = [
  { value: "VACATION", label: "Vacación" },
  { value: "EMERGENCY", label: "Emergencia" },
  { value: "RETIREMENT", label: "Retiro" },
  { value: "PURCHASE", label: "Compra" },
  { value: "OTHER", label: "Otro" },
];

const SavingsPage = () => {
  const token = sessionStorage.getItem("authToken");
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [currentGoal, setCurrentGoal] = useState(null);

  const getSavingsGoals = async () => apiFetcher("saving_goals/", "GET", token);

  const { data: savingGoals } = useQuery({
    queryKey: ["saving_goals/"],
    queryFn: getSavingsGoals,
  });

  const addSavingsGoalMutation = useMutation({
    mutationFn: (goal) => apiFetcher("saving_goals/", "POST", token, goal),
    onSuccess: () => {
      queryClient.invalidateQueries(["saving_goals/"]);
    },
  });

  const updateSavingsGoalMutation = useMutation({
    mutationFn: (goal) =>
      apiFetcher(`saving_goals/${goal.id}/`, "PUT", token, goal),
    onSuccess: () => {
      queryClient.invalidateQueries(["saving_goals/"]);
    },
  });

  const deleteSavingsGoalMutation = useMutation({
    mutationFn: (id) => apiFetcher(`saving_goals/${id}/`, "DELETE", token),
    onSuccess: () => {
      queryClient.invalidateQueries(["saving_goals/"]);
    },
  });

  const handleAddGoal = () => {
    setCurrentGoal(null);
    setModalOpen(true);
  };

  const handleEditGoal = (goal) => {
    setCurrentGoal(goal);
    setModalOpen(true);
  };

  const handleDeleteGoal = (id) => {
    deleteSavingsGoalMutation.mutate(id);
  };

  const handleSaveGoal = (goal) => {
    if (goal.id) {
      updateSavingsGoalMutation.mutate(goal);
    } else {
      addSavingsGoalMutation.mutate(goal);
    }
    setModalOpen(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4">
      <span className="text-2xl font-bold">Objetivos de ahorro</span>
      <div className="space-y-4">
        {savingGoals?.map((goal) => {
          const progress = Math.min(
            (goal.accumulated_amount / goal.target_amount) * 100,
            100
          );
          return (
            <div key={goal.id} className="shadow-lg border rounded-lg p-6">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">
                  {
                    goalTypes.find((type) => type.value === goal.goal_type)
                      .label
                  }
                </span>
                <span className="text-sm font-medium">
                  {progress.toFixed(1)}% completado
                </span>
              </div>
              <Progress value={progress} className="w-full" />
              <div className="flex justify-between items-center mt-4">
                <span className="text-sm font-bold">
                  Objetivo: ${goal.target_amount.toLocaleString()}
                </span>
                <span className="text-sm font-bold">
                  Acumulado: ${goal.accumulated_amount.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-end space-x-2 mt-4">
                <Button onClick={() => handleEditGoal(goal)}>Editar</Button>
                <Button color="red" onClick={() => handleDeleteGoal(goal.id)}>
                  Eliminar
                </Button>
              </div>
            </div>
          );
        })}
        <Button onClick={handleAddGoal} fullWidth>
          Agregar
        </Button>
      </div>
      <Modal opened={modalOpen} onClose={() => setModalOpen(false)}>
        <SavingsForm
          goal={currentGoal}
          onSave={handleSaveGoal}
          onCancel={() => setModalOpen(false)}
        />
      </Modal>
    </div>
  );
};

const SavingsForm = ({ goal, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    goal_type: "",
    target_amount: "",
    accumulated_amount: "",
    start_date: "",
    end_date: "",
  });

  useEffect(() => {
    if (goal) {
      setFormData(goal);
    }
  }, [goal]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSelectChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      goal_type: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Tipo"
        name="goal_type"
        value={formData.goal_type}
        onChange={handleSelectChange}
        data={goalTypes}
        required
      />
      <TextInput
        label="Objetivo"
        name="target_amount"
        value={formData.target_amount}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Acumulado"
        name="accumulated_amount"
        value={formData.accumulated_amount}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Fecha de inicio"
        name="start_date"
        type="date"
        value={formData.start_date}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Fecha final"
        name="end_date"
        type="date"
        value={formData.end_date}
        onChange={handleChange}
      />
      <Group position="right" mt="md">
        <Button type="submit">Guardar</Button>
        <Button color="red" onClick={onCancel}>
          Cancelar
        </Button>
      </Group>
    </form>
  );
};

export default SavingsPage;
