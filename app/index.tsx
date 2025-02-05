import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { Link } from 'expo-router';
import axios from 'axios'; 

const CurrencyConverter = () => {
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = 'https://api.exchangerate-api.com/v4/latest/IDR';

    const fetchExchangeRates = async () => {
      try {
        const response = await axios.get(API_URL); 
        setExchangeRates(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching exchange rates:', error);
        setLoading(false);
      }
    };

    fetchExchangeRates();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000" />
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!exchangeRates) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error loading data.</Text>
      </View>
    );
  }

  const { rates } = exchangeRates;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>CURRENCY CONVERTER</Text>
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{new Date().toLocaleDateString()}</Text>
      </View>

      <View style={styles.currencyContainer}>
        <Link href="/screen">
          <View style={styles.row}>
            <Image source={{ uri: 'https://flagcdn.com/id.svg' }} style={styles.flag} />
            <View style={styles.textContainer}>
              <Text style={styles.currencyName}>Indonesian Rupiah</Text>
              <Text style={styles.currencyCode}>IDR</Text>
            </View>
            <Text style={styles.amount}>Rp 1 </Text>
          </View>
        </Link>

        <View style={styles.row}>
          <Image source={{ uri: 'https://flagcdn.com/us.svg' }} style={styles.flag} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyName}>US Dollar</Text>
            <Text style={styles.currencyCode}>USD</Text>
          </View>
          <Text style={styles.amount}>${(rates.USD).toFixed(6)}</Text>
          <Text style={styles.rate}>1 USD = {1 / rates.USD.toFixed(6)} IDR</Text>
        </View>

        <View style={styles.row}>
          <Image source={{ uri: 'https://flagcdn.com/eu.svg' }} style={styles.flag} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyName}>Euro</Text>
            <Text style={styles.currencyCode}>EUR</Text>
          </View>
          <Text style={styles.amount}>€ {(rates.EUR).toFixed(6)}</Text>
          <Text style={styles.rate}>1 EUR = {1 / rates.EUR.toFixed(6)} IDR</Text>
        </View>

        <View style={styles.row}>
          <Image source={{ uri: 'https://flagcdn.com/jp.svg' }} style={styles.flag} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyName}>Japanese Yen</Text>
            <Text style={styles.currencyCode}>JPY</Text>
          </View>
          <Text style={styles.amount}>¥ {(rates.JPY).toFixed(6)}</Text>
          <Text style={styles.rate}>1 JPY = {1 /rates.JPY.toFixed(6)} IDR</Text>
        </View>

        <View style={styles.row}>
          <Image source={{ uri: 'https://flagcdn.com/sg.svg' }} style={styles.flag} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyName}>SGP Dollar</Text>
            <Text style={styles.currencyCode}>SGD</Text>
          </View>
          <Text style={styles.amount}>S$ {(rates.SGD).toFixed(6)}</Text>
          <Text style={styles.rate}>1 SGD = {1 /rates.SGD.toFixed(6)} IDR</Text>
        </View>

        <View style={styles.row}>
          <Image source={{ uri: 'https://flagcdn.com/cn.svg' }} style={styles.flag} />
          <View style={styles.textContainer}>
            <Text style={styles.currencyName}>Yuan Tiongkok</Text>
            <Text style={styles.currencyCode}>CNY</Text>
          </View>
          <Text style={styles.amount}>¥ {( rates.CNY).toFixed(6)}</Text>
          <Text style={styles.rate}>1 CNY = {1 /rates.CNY.toFixed(6)} IDR</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 16,
  },
  dateContainer: {
    backgroundColor: '#f0f0f0',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
    marginBottom: 16,
  },
  date: {
    fontSize: 16,
    color: '#888',
  },
  currencyContainer: {
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    justifyContent: "space-between",
    width: "100%",
  },
  flag: {
    width: 40,
    height: 30,
    marginRight: 12,
    borderRadius: 4,
  },
  textContainer: {
    flex: 1,
  },
  currencyName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  currencyCode: {
    fontSize: 14,
    color: '#666',
  },
  amount: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  rate: {
    fontSize: 12,
    color: '#666',
    textAlign: 'right',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default CurrencyConverter;