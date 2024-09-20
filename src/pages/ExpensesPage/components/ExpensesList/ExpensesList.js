import { useState } from "react";
import cx from "clsx";
import { rem, Text, Checkbox, Group, Button } from "@mantine/core";
import { Table, ScrollArea, TextInput } from "@mantine/core";
import classes from "./ExpensesList.module.css";
import { IconSearch } from "@tabler/icons-react";
import { expenseTypes } from "../ExpensesForm/ExpensesForm";

const ExpensesList = (props) => {
  const { editMode = false, data = [], onEdit, onDelete } = props;
  const [scrolled, setScrolled] = useState(false);
  const [selection, setSelection] = useState([]);
  const [search, setSearch] = useState("");

  const toggleRow = (id) => {
    setSelection((current) => {
      return current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id];
    });
  };

  const toggleAll = () => {
    setSelection((current) =>
      current.length === data.length ? [] : data.map((item) => item.id)
    );
  };

  const rows = data.map((item) => {
    const selected = selection.includes(item.id);

    return (
      <Table.Tr
        key={item.id}
        className={cx({ [classes.rowSelected]: selected })}
      >
        {editMode ? (
          <Table.Td>
            <Checkbox
              checked={selection.includes(item.id)}
              onChange={() => toggleRow(item.id)}
            />
          </Table.Td>
        ) : null}
        <Table.Td>
          <Group gap="sm">
            <Text size="sm" fw={500}>
              {
                expenseTypes.find((type) => type.value === item.expense_type)
                  .label
              }
            </Text>
          </Group>
        </Table.Td>
        <Table.Td>{item.amount}</Table.Td>
        <Table.Td>{item.date}</Table.Td>
        <Table.Td>{item.description}</Table.Td>
        <Table.Td>
          <Button onClick={() => onEdit(item)}>Editar</Button>
          <Button color="red" onClick={() => onDelete(item.id)}>
            Eliminar
          </Button>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <>
      <TextInput
        placeholder="Search expenses..."
        mb="md"
        leftSection={
          <IconSearch
            style={{ width: rem(16), height: rem(16) }}
            stroke={1.5}
          />
        }
        value={search}
        onChange={(event) => setSearch(event.currentTarget.value)}
      />
      <ScrollArea
        h={"70vh"}
        onScrollPositionChange={({ y }) => setScrolled(y !== 0)}
      >
        <Table horizontalSpacing="lg" verticalSpacing="xs" miw={700}>
          <Table.Tbody>
            <Table.Tr
              className={cx(classes.header, { [classes.scrolled]: scrolled })}
            >
              {editMode ? (
                <Table.Th style={{ width: rem(40) }}>
                  <Checkbox
                    onChange={toggleAll}
                    checked={selection.length === data.length}
                    indeterminate={
                      selection.length > 0 && selection.length !== data.length
                    }
                    style={{ zIndex: 99 }}
                  />
                </Table.Th>
              ) : null}
              <Table.Th>Tipo de gasto</Table.Th>
              <Table.Th>Monto</Table.Th>
              <Table.Th>Fecha</Table.Th>
              <Table.Th>Descripción</Table.Th>
              <Table.Th>Acciones</Table.Th>
            </Table.Tr>
          </Table.Tbody>
          <Table.Tbody>
            {rows.length ? (
              rows
            ) : (
              <Table.Tr>
                <Table.Td colSpan={5}>
                  <Text fw={500} ta="center">
                    No hay datos
                  </Text>
                </Table.Td>
              </Table.Tr>
            )}
          </Table.Tbody>
        </Table>
      </ScrollArea>
    </>
  );
};

export default ExpensesList;
