import { useState, useEffect } from "react";
import { TextInput, Button, Group, Select } from "@mantine/core";

export const incomeTypes = [
  { value: "SALARY", label: "Salario" },
  { value: "FREELANCE", label: "Freelance" },
  { value: "INVESTMENT", label: "Inversiones" },
  { value: "GIFT", label: "Regalo" },
  { value: "OTHER", label: "Otros" },
];

const IncomeForm = ({ income, onSave, onCancel }) => {
  const [formData, setFormData] = useState({
    income_type: "",
    amount: "",
    date: "",
    description: "",
  });

  useEffect(() => {
    if (income) {
      setFormData(income);
    }
  }, [income]);

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
      income_type: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Select
        label="Tipo de ingreso"
        name="income_type"
        value={formData.income_type}
        onChange={handleSelectChange}
        data={incomeTypes}
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

export default IncomeForm;
