import InputBase, { type InputBaseProps } from "@mui/material/InputBase";
import NativeSelect from "@mui/material/NativeSelect";
import type { SxProps, Theme } from "@mui/material/styles";
import { COLORS } from "../theme/tokens";

type Tone = "card" | "paper" | "cream";

const BG: Record<Tone, string> = { card: COLORS.card, paper: COLORS.paper, cream: COLORS.cream };

function fieldSx(tone: Tone, borderColor: string): SxProps<Theme> {
  return {
    bgcolor: BG[tone],
    border: `1px solid ${borderColor}`,
    borderRadius: "6px",
    fontSize: 16,
    color: COLORS.ink,
    "& .MuiInputBase-input": { padding: "14px 16px" },
    "&.Mui-focused": { borderColor: COLORS.ink },
  };
}

type FieldInputProps = InputBaseProps & {
  tone?: Tone;
  borderColor?: string;
};

/** Text input in the design's style. Always pass an aria-label or a visible label. */
export function FieldInput({
  tone = "card",
  borderColor = COLORS.lineStrong,
  sx,
  ...props
}: FieldInputProps) {
  return (
    <InputBase {...props} sx={[fieldSx(tone, borderColor), ...(Array.isArray(sx) ? sx : [sx])]} />
  );
}

type FieldSelectProps = {
  value: string;
  onChange: (value: string) => void;
  options: [value: string, label: string][];
  label: string;
  tone?: Tone;
  borderColor?: string;
  sx?: SxProps<Theme>;
};

export function FieldSelect({
  value,
  onChange,
  options,
  label,
  tone = "cream",
  borderColor = COLORS.line,
  sx,
}: FieldSelectProps) {
  return (
    <NativeSelect
      value={value}
      onChange={(e) => onChange(e.target.value)}
      inputProps={{ "aria-label": label }}
      input={
        <InputBase
          sx={[
            fieldSx(tone, borderColor),
            {
              fontSize: 15,
              "& .MuiNativeSelect-select": { padding: "12px 32px 12px 12px", borderRadius: "6px" },
            },
            ...(Array.isArray(sx) ? sx : [sx]),
          ]}
        />
      }
    >
      {options.map(([v, text]) => (
        <option key={v} value={v}>
          {text}
        </option>
      ))}
    </NativeSelect>
  );
}
