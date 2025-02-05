import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Button,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";

const CurrencyConverter = () => {
  const [amount, setAmount] = useState("1");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState("IDR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [exchangeRate, setExchangeRate] = useState(0);
  const [currencies, setCurrencies] = useState([]);
  const [history, setHistory] = useState([]);

  const API_URL = "https://api.exchangerate-api.com/v4/latest/";

  useEffect(() => {
    fetchExchangeRates();
  }, [fromCurrency, toCurrency]);

  const fetchExchangeRates = async () => {
    try {
      const response = await axios.get(`${API_URL}${fromCurrency}`);
      if (response.data.rates) {
        setCurrencies(Object.keys(response.data.rates));
        setExchangeRate(response.data.rates[toCurrency]);
        setConvertedAmount((amount * response.data.rates[toCurrency]).toFixed(2));
      } else {
        alert("Error fetching exchange rates");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleConvert = () => {
    const result = (parseFloat(amount) * exchangeRate).toFixed(2);
    setConvertedAmount(result);

    const conversionEntry = {
      id: Date.now().toString(),
      fromCurrency,
      toCurrency,
      amount,
      convertedAmount: result,
      exchangeRate,
    };
    setHistory([conversionEntry, ...history]);
  };

  const handleReverse = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
  };

  const renderHistoryItem = ({ item }) => (
    <View style={styles.historyItem}>
      <Text style={styles.historyText}>
        {item.amount} {item.fromCurrency} → {item.convertedAmount} {item.toCurrency}
      </Text>
      <Text style={styles.historyRate}>
        Rate: 1 {item.fromCurrency} = {item.exchangeRate.toFixed(2)} {item.toCurrency}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>CURRENCY CONVERTER</Text>
      <Text style={styles.subheader}>
        Change currency rates instantly with a converter supported by the latest exchange rates from around the world.
      </Text>

      <View style={styles.converterBox}>
        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={amount}
            keyboardType="numeric"
            onChangeText={(text) => setAmount(text)}
          />
          <Picker
            selectedValue={fromCurrency}
            style={styles.picker}
            onValueChange={(itemValue) => setFromCurrency(itemValue)}
          >
            {currencies.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>

        <Button title="⇆" onPress={handleReverse} color="#007BFF" />

        <View style={styles.row}>
          <TextInput
            style={styles.input}
            value={convertedAmount}
            editable={false}
          />
          <Picker
            selectedValue={toCurrency}
            style={styles.picker}
            onValueChange={(itemValue) => setToCurrency(itemValue)}
          >
            {currencies.map((currency) => (
              <Picker.Item key={currency} label={currency} value={currency} />
            ))}
          </Picker>
        </View>
      </View>

      <Button title="Convert" onPress={handleConvert} color="#007BFF" />

      <Text style={styles.exchangeRate}>
        {exchangeRate
          ? `Indicative Exchange Rate: 1 ${fromCurrency} = ${exchangeRate.toFixed(2)} ${toCurrency}`
          : "Loading exchange rate..."}
      </Text>

      <Text style={styles.historyHeader}>History</Text>
      <FlatList
        data={history}
        renderItem={renderHistoryItem}
        keyExtractor={(item) => item.id}
        style={styles.historyList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 10,
  },
  subheader: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 20,
    color: "#666",
  },
  converterBox: {
    borderWidth: 1,
    borderColor: "#007BFF",
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 5,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
  picker: {
    width: 100,
  },
  exchangeRate: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 14,
    color: "#333",
  },
  historyHeader: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 30,
    marginBottom: 10,
  },
  historyItem: {
    padding: 10,
    backgroundColor: "#f9f9f9",
    borderRadius: 5,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default CurrencyConverter;
