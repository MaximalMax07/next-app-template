import { useState, useEffect } from 'react';
import { Button, Card, Image, Text, Group, ActionIcon, Popover, Table, Flex } from '@mantine/core';
import { IconShoppingCart } from '@tabler/icons-react';
import { getProducts } from '../../services/productService';
import styles from './Kantine.module.css';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
}

export function Kantine() {
  const [opened, setOpened] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  useEffect(() => {
    const loadProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
      setAmounts(fetchedProducts.map(() => 0));
    };
    loadProducts();
  }, []);

  const handleCartClick = () => {
    setOpened((o) => !o);
  };

  const [amounts, setAmounts] = useState(products.map(() => 0));

  const handleIncrement = (index: number) => {
    const newAmounts = [...amounts];
    newAmounts[index] += 1;
    setAmounts(newAmounts);
  };

  const handleDecrement = (index: number): void => {
    const newAmounts: number[] = [...amounts];
    newAmounts[index] = newAmounts[index] > 0 ? newAmounts[index] - 1 : 0;
    setAmounts(newAmounts);
  };

  const handleClearCart = () => {
    setAmounts(products.map(() => 0));
  };

  const isCartEmpty = amounts.every(amount => amount === 0);
  return (
    <>
      <Group justify="center" mt="xl">
        {products.map((product, index) => (
          <Card key={product.id} shadow="sm" padding="lg">
            <Card.Section>
              <Image src={product.image} alt={product.name} height={160} />
            </Card.Section>
            <Group align="apart" mt="md" mb="xs">
              <Text style={{ fontWeight: 500 }}>{product.name}</Text>
              <Text color="red">
                {new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price)}
              </Text>
            </Group>
            <Group mt="md" align="center">
              <Button color="red" size="xs" onClick={() => handleDecrement(index)}>-</Button>
              <Text style={{ margin: '0 8px' }}>{amounts[index]}</Text>
              <Button color="red"size="xs" onClick={() => handleIncrement(index)}>+</Button>
            </Group>
          </Card>
        ))}
      </Group>
      <Popover
        opened={opened}
        onClose={() => setOpened(false)}
        position="top"
        withArrow
      >
        <Popover.Target>
          <ActionIcon
            size="xl"
            color="red"
            style={{
              position: 'fixed',
              bottom: 20,
              right: 20,
            }}
            onClick={handleCartClick}
          >
            <IconShoppingCart size={24} />
          </ActionIcon>
        </Popover.Target>
        <Popover.Dropdown>
          {amounts.every(amount => amount === 0) ? (
            <Text style={{ textAlign: 'center' }}>Einkaufswagen ist leer</Text>
          ) : (
            <Table className={styles.table}>
              <thead>
                <tr>
                  <th>Produkt</th>
                  <th>Preis</th>
                  <th>Anzahl</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  amounts[index] > 0 && (
                    <tr key={product.id}>
                      <td>{product.name}</td>
                      <td>{new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(product.price)}</td>
                      <td>{amounts[index]}</td>
                    </tr>
                  )
                ))}
              </tbody>
            </Table>

          )}
          {!isCartEmpty && (
            <Flex mih={50}
              gap="xl"
              justify="center"
              align="center"
              direction="row"
              wrap="nowrap">
              <Button onClick={handleClearCart} color="red">Leeren</Button>
              <Button color="green">Bezahlen</Button>
            </Flex>
          )}
        </Popover.Dropdown>
      </Popover>
    </>
  );
}