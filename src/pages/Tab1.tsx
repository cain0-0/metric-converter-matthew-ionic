import { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonSelect, IonSelectOption, IonInput, IonLabel, IonText, IonButton } from '@ionic/react';
import './Tab1.css';

const Tab1: React.FC = () => {
  const [metric, setMetric] = useState<string | undefined>(undefined);
  const [unitFrom, setUnitFrom] = useState<string | undefined>(undefined);
  const [unitTo, setUnitTo] = useState<string | undefined>(undefined);
  const [value, setValue] = useState<number | undefined>(undefined);
  const [result, setResult] = useState<number | undefined>(undefined);

  const metrics: { [key: string]: string[] } = {
    Panjang: ['Meter', 'Kilometer', 'Centimeter'],
    Waktu: ['Detik', 'Menit', 'Jam'],
    Suhu: ['Celsius', 'Fahrenheit', 'Kelvin']
  };

  const handleConvert = () => {
    if (unitFrom && unitTo && value !== undefined) {
      let conversionFactor = 1;
      let convertedValue = value;

      // Konversi Panjang
      if (metric === 'Panjang') {
        if (unitFrom === 'Meter' && unitTo === 'Kilometer') conversionFactor = 0.001;
        else if (unitFrom === 'Kilometer' && unitTo === 'Meter') conversionFactor = 1000;
        else if (unitFrom === 'Meter' && unitTo === 'Centimeter') conversionFactor = 100;
        else if (unitFrom === 'Centimeter' && unitTo === 'Meter') conversionFactor = 0.01;
        else if (unitFrom === 'Kilometer' && unitTo === 'Centimeter') conversionFactor = 100000;
        else if (unitFrom === 'Centimeter' && unitTo === 'Kilometer') conversionFactor = 0.00001;

      // Konversi Waktu
      } else if (metric === 'Waktu') {
        if (unitFrom === 'Detik' && unitTo === 'Menit') conversionFactor = 1 / 60;
        else if (unitFrom === 'Menit' && unitTo === 'Detik') conversionFactor = 60;
        else if (unitFrom === 'Detik' && unitTo === 'Jam') conversionFactor = 1 / 3600;
        else if (unitFrom === 'Jam' && unitTo === 'Detik') conversionFactor = 3600;
        else if (unitFrom === 'Menit' && unitTo === 'Jam') conversionFactor = 1 / 60;
        else if (unitFrom === 'Jam' && unitTo === 'Menit') conversionFactor = 60;

      // Konversi Suhu
      } else if (metric === 'Suhu') {
        if (unitFrom === 'Celsius' && unitTo === 'Fahrenheit') {
          convertedValue = (value * 9/5) + 32;
        } else if (unitFrom === 'Fahrenheit' && unitTo === 'Celsius') {
          convertedValue = (value - 32) * 5/9;
        } else if (unitFrom === 'Celsius' && unitTo === 'Kelvin') {
          convertedValue = value + 273.15;
        } else if (unitFrom === 'Kelvin' && unitTo === 'Celsius') {
          convertedValue = value - 273.15;
        } else if (unitFrom === 'Fahrenheit' && unitTo === 'Kelvin') {
          convertedValue = ((value - 32) * 5/9) + 273.15;
        } else if (unitFrom === 'Kelvin' && unitTo === 'Fahrenheit') {
          convertedValue = ((value - 273.15) * 9/5) + 32;
        }
      }

      if (unitFrom === unitTo) {
        setResult(value);
      } else if (metric !== 'Suhu') {
        setResult(value * conversionFactor);
      } else {
        setResult(convertedValue);
      }
    }
  };

  const handleValueChange = (e: any) => {
    const newValue = parseFloat(e.detail.value);
    if (isNaN(newValue)) {
      alert('Input harus berupa angka!');
    } else {
      setValue(newValue);
    }
  };

  const formatResult = (result: number | undefined) => {
    if (result === undefined) return 'Hasil akan muncul di sini';
    if (Math.floor(result) === result) {
      return result.toString();
    }
    return result.toFixed(4);
  };

  return (
    <IonPage>
      <IonHeader style={{ backgroundColor: '#FF0000' }}>
        <IonToolbar>
          <IonTitle style={{ color: '#FF0000' }}>Metric Converter</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonText color="medium" style={{ fontSize: 'small' }}>
            By: Matthew Darren Sumampouw
          </IonText>
        </IonToolbar>
      </IonHeader>
      <IonContent
        fullscreen
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}
      >
        <div style={{ textAlign: 'center' }}>
          <IonItem>
            <IonLabel>Dari:</IonLabel>
            <IonSelect
              value={metric}
              placeholder="Pilih Metric"
              onIonChange={e => {
                setMetric(e.detail.value);
                setUnitFrom(undefined);
                setUnitTo(undefined);
              }}
              style={{ backgroundColor: '#f0f0f0', color: '#333' }}
            >
              {Object.keys(metrics).map((metricName, index) => (
                <IonSelectOption key={index} value={metricName}>{metricName}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Satuan Awal:</IonLabel>
            <IonSelect
              value={unitFrom}
              placeholder="Pilih Satuan"
              onIonChange={e => setUnitFrom(e.detail.value)}
              disabled={!metric}
              style={{ backgroundColor: '#e0e0e0', color: '#333' }}
            >
              {metric && metrics[metric].map((unit: string, index: number) => (
                <IonSelectOption key={index} value={unit}>{unit}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Ke Satuan:</IonLabel>
            <IonSelect
              value={unitTo}
              placeholder="Pilih Satuan"
              onIonChange={e => setUnitTo(e.detail.value)}
              disabled={!metric}
              style={{ backgroundColor: '#e0e0e0', color: '#333' }}
            >
              {metric && metrics[metric].map((unit: string, index: number) => (
                <IonSelectOption key={index} value={unit}>{unit}</IonSelectOption>
              ))}
            </IonSelect>
          </IonItem>

          <IonItem>
            <IonLabel>Nilai:</IonLabel>
            <IonInput
              type="text"
              value={value} // Menghubungkan state value dengan input
              onIonChange={handleValueChange}
              disabled={!unitFrom || !unitTo}
            />
          </IonItem>

          <IonButton
            expand="block"
            onClick={handleConvert}
            disabled={!unitFrom || !unitTo || value === undefined}
            style={{ backgroundColor: '#FF0000', color: '#FF0000' }}
          >
            Konversi
          </IonButton>

          <IonItem>
            <IonLabel>Hasil:</IonLabel>
            <IonText style={{ color: '#FF0000' }}>{formatResult(result)}</IonText>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
