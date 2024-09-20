import { useState, useEffect } from "react";
import { TextInput, Button, Group, Select } from "@mantine/core";

export const expenseTypes = [
  { value: "FOOD", label: "Alimentación" },
  { value: "TRANSPORT", label: "Transporte" },
  { value: "ENTERTAINMENT", label: "Entretenimiento" },
  { value: "BILLS", label: "Deudas" },
  { value: "OTHER", label: "Otros" },
];

const ExpenseForm = ({ expense, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    expense_type: "",
    amount: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (expense) {
      setFormData(expense);
    }
  }, [expense]);

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
      expense_type: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Tipo de gasto"
        name="expense_type"
        value={formData.expense_type}
        onChange={handleSelectChange}
        data={expenseTypes}
        required
      />
      <TextInput
        label="Monto"
        name="amount"
        value={formData.amount}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Fecha"
        name="date"
        type="date"
        value={formData.date}
        onChange={handleChange}
        required
      />
      <TextInput
        label="Descripción"
        name="description"
        value={formData.description}
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

export default ExpenseForm;
