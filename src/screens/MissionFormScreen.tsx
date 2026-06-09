import { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { useMission } from "../../src/contexts/MissionContext";
import { MissionConfig } from "../../src/types/mission";
import { globalStyles, COLORS } from "../../src/styles/theme";
import { styles } from "./MissionFormScreen.styles";

interface FormValues {
  missionName: string;
  commanderName: string;
  launchDate: string;
  targetOrbit: string;
  crewCount: string;
}

interface FormErrors {
  missionName?: string;
  commanderName?: string;
  launchDate?: string;
  targetOrbit?: string;
  crewCount?: string;
}

const ORBIT_OPTIONS = ["LEO", "MEO", "GEO", "HEO", "LUNAR", "MARTE"];

const validateForm = (values: FormValues): FormErrors => {
  const errors: FormErrors = {};

  if (!values.missionName.trim())
    errors.missionName = "Preencha o nome da missão";
  else if (values.missionName.trim().length < 3)
    errors.missionName = "O nome da missão precisa ter pelo menos 3 caracteres";

  if (!values.commanderName.trim())
    errors.commanderName = "Preencha o nome do comandante";
  else if (!/^[a-zA-Z\s.'-]+$/.test(values.commanderName))
    errors.commanderName = "Nome do comandante possui caracteres inválidos";

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!values.launchDate.trim()) errors.launchDate = "Informe a data de lançamento";
  else if (!dateRegex.test(values.launchDate))
    errors.launchDate = "Data precisa estar no formato YYYY-MM-DD.";

  if (!values.targetOrbit.trim())
    errors.targetOrbit = "Informe a órbita";

  const crew = parseInt(values.crewCount, 10);
  if (!values.crewCount.trim()) errors.crewCount = "Informe o número de tripulantes";
  else if (isNaN(crew) || crew < 1 || crew > 10)
    errors.crewCount = "O tamanho da tripulação deve ser entre 1 e 10";

  return errors;
};

export default function MissionFormScreen() {
  const { state, updateConfig } = useMission();
  const [values, setValues] = useState<FormValues>({
    missionName: state.config.missionName,
    commanderName: state.config.commanderName,
    launchDate: state.config.launchDate,
    targetOrbit: state.config.targetOrbit,
    crewCount: String(state.config.crewCount),
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [focused, setFocused] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const handleChange = (field: keyof FormValues, value: string) => {
    setValues((v) => ({ ...v, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: undefined }));
    setSaved(false);
  };

  const handleSubmit = () => {
    const errs = validateForm(values);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      Alert.alert("Erro de Validação", "Por favor corrija os campos destacados");
      return;
    }

    const config: MissionConfig = {
      missionName: values.missionName.trim(),
      commanderName: values.commanderName.trim(),
      launchDate: values.launchDate.trim(),
      targetOrbit: values.targetOrbit.trim(),
      crewCount: parseInt(values.crewCount, 10),
    };

    updateConfig(config);
    setSaved(true);
    Alert.alert("Salvo!", "Configuração da missão atualizada com sucesso!");
  };

  const inputStyle = (field: keyof FormValues) => [
    globalStyles.input,
    focused === field && globalStyles.inputFocused,
    errors[field] ? globalStyles.inputError : {},
  ];

  return (
    <KeyboardAvoidingView
      style={globalStyles.screen}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>CONFIGURAÇÃO DA MISSÃO</Text>
          <Text style={styles.subtitle}>ATUALIZAR PARÂMETROS DA MISSÃO</Text>
        </View>

        {saved && (
          <View style={styles.successBanner}>
            <Text style={styles.successText}>
              Configuração salva!
            </Text>
          </View>
        )}

        {/* Mission Info */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>DETALHES DA MISSÃO</Text>

          <Text style={globalStyles.label}>Nome da Missão</Text>
          <TextInput
            style={inputStyle("missionName")}
            value={values.missionName}
            onChangeText={(v) => handleChange("missionName", v)}
            onFocus={() => setFocused("missionName")}
            onBlur={() => setFocused(null)}
            placeholder="ex: Apollo X"
            placeholderTextColor={COLORS.textMuted}
          />
          {errors.missionName && (
            <Text style={globalStyles.errorText}>{errors.missionName}</Text>
          )}

          <Text style={globalStyles.label}>Nome do Comandante</Text>
          <TextInput
            style={inputStyle("commanderName")}
            value={values.commanderName}
            onChangeText={(v) => handleChange("commanderName", v)}
            onFocus={() => setFocused("commanderName")}
            onBlur={() => setFocused(null)}
            placeholder="ex: John Doe"
            placeholderTextColor={COLORS.textMuted}
          />
          {errors.commanderName && (
            <Text style={globalStyles.errorText}>{errors.commanderName}</Text>
          )}

          <Text style={globalStyles.label}>Data de lançamento (YYYY-MM-DD)</Text>
          <TextInput
            style={inputStyle("launchDate")}
            value={values.launchDate}
            onChangeText={(v) => handleChange("launchDate", v)}
            onFocus={() => setFocused("launchDate")}
            onBlur={() => setFocused(null)}
            placeholder="ex: 2026-06-01"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
          />
          {errors.launchDate && (
            <Text style={globalStyles.errorText}>{errors.launchDate}</Text>
          )}

          <Text style={globalStyles.label}>Tripulação (1–10)</Text>
          <TextInput
            style={inputStyle("crewCount")}
            value={values.crewCount}
            onChangeText={(v) => handleChange("crewCount", v)}
            onFocus={() => setFocused("crewCount")}
            onBlur={() => setFocused(null)}
            placeholder="ex: 3"
            placeholderTextColor={COLORS.textMuted}
            keyboardType="numeric"
          />
          {errors.crewCount && (
            <Text style={globalStyles.errorText}>{errors.crewCount}</Text>
          )}
        </View>

        {/* Orbit Selector */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Órbita</Text>
          {errors.targetOrbit && (
            <Text style={globalStyles.errorText}>{errors.targetOrbit}</Text>
          )}
          <View style={styles.orbitGrid}>
            {ORBIT_OPTIONS.map((orbit) => (
              <TouchableOpacity
                key={orbit}
                style={[
                  styles.orbitBtn,
                  values.targetOrbit === orbit && styles.orbitBtnActive,
                ]}
                onPress={() => handleChange("targetOrbit", orbit)}
              >
                <Text
                  style={[
                    styles.orbitText,
                    values.targetOrbit === orbit && styles.orbitTextActive,
                  ]}
                >
                  {orbit}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Current Config Preview */}
        <View style={globalStyles.card}>
          <Text style={globalStyles.cardTitle}>Configuração Atual</Text>
          {[
            ["Missão:", state.config.missionName],
            ["Comandante:", state.config.commanderName],
            ["Lançamento:", state.config.launchDate],
            ["Órbita:", state.config.targetOrbit],
            ["Tripulação:", String(state.config.crewCount)],
          ].map(([label, val]) => (
            <View key={label} style={[globalStyles.row, { marginBottom: 6 }]}>
              <Text style={globalStyles.label}>{label}</Text>
              <Text style={globalStyles.value}>{val}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={globalStyles.button} onPress={handleSubmit}>
          <Text style={globalStyles.buttonText}>SALVAR CONFIGURAÇÃO</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
