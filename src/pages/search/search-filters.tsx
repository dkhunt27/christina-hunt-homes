import Box from "@mui/material/Box";
import { FieldInput, FieldSelect } from "../../components/field-input";
import { COUNTIES } from "../../constants";
import { DEST_KEYS, DESTS } from "../../lib/commute";
import { COLORS, SV } from "../../theme/tokens";
import type { ListingFilters } from "../../types";

type FilterProps = {
  filters: ListingFilters;
  onChange: (key: keyof ListingFilters, value: string) => void;
};

const PRICE_OPTIONS: [string, string][] = [
  ["any", "Any price"],
  ["250000", "Up to $250k"],
  ["400000", "Up to $400k"],
  ["500000", "Up to $500k"],
  ["750000", "Up to $750k"],
];
const BED_OPTIONS: [string, string][] = [
  ["0", "Any beds"],
  ["2", "2+ beds"],
  ["3", "3+ beds"],
  ["4", "4+ beds"],
];
const TYPE_OPTIONS: [string, string][] = [
  ["Any", "Any type"],
  ["House", "House"],
  ["Condo", "Condo"],
  ["Townhome", "Townhome"],
];
const COUNTY_OPTIONS: [string, string][] = [
  ["Any", "All counties"],
  ...COUNTIES.map((c): [string, string] => [c, c]),
];
const MINUTE_OPTIONS: [string, string][] = [
  ["20", "within 20 min"],
  ["30", "within 30 min"],
  ["45", "within 45 min"],
];
const DEST_OPTIONS: [string, string][] = [
  ["none", "anywhere (off)"],
  ...DEST_KEYS.map((k): [string, string] => [k, DESTS[k].label]),
];

export function SearchFilters({ filters, onChange }: FilterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        bgcolor: COLORS.card,
        border: `1px solid ${COLORS.line}`,
        borderRadius: "10px",
        p: "10px",
      }}
    >
      <FieldInput
        tone="cream"
        borderColor={COLORS.line}
        value={filters.q}
        onChange={(e) => onChange("q", e.target.value)}
        placeholder="City, neighborhood, county, or ZIP"
        inputProps={{ "aria-label": "City, neighborhood, county, or ZIP" }}
        sx={{ flex: 2, minWidth: 200, "& .MuiInputBase-input": { p: "12px 14px" } }}
      />
      <FieldSelect
        label="Max price"
        value={filters.maxPrice}
        onChange={(v) => onChange("maxPrice", v)}
        options={PRICE_OPTIONS}
        sx={{ flex: 1, minWidth: 130 }}
      />
      <FieldSelect
        label="Bedrooms"
        value={filters.beds}
        onChange={(v) => onChange("beds", v)}
        options={BED_OPTIONS}
        sx={{ flex: 1, minWidth: 110 }}
      />
      <FieldSelect
        label="Home type"
        value={filters.type}
        onChange={(v) => onChange("type", v)}
        options={TYPE_OPTIONS}
        sx={{ flex: 1, minWidth: 120 }}
      />
      <FieldSelect
        label="County"
        value={filters.county}
        onChange={(v) => onChange("county", v)}
        options={COUNTY_OPTIONS}
        sx={{ flex: 1, minWidth: 130 }}
      />
    </Box>
  );
}

export function CommuteBar({ filters, onChange }: FilterProps) {
  return (
    <Box
      sx={{
        display: "flex",
        gap: "10px",
        flexWrap: "wrap",
        alignItems: "center",
        bgcolor: SV.accSoft,
        borderRadius: "10px",
        px: "14px",
        py: "10px",
        fontSize: 15,
        transition: "background .4s",
      }}
    >
      <Box component="span" sx={{ fontWeight: 600 }}>
        Commute:
      </Box>
      <FieldSelect
        label="Maximum drive time"
        value={filters.maxMin}
        onChange={(v) => onChange("maxMin", v)}
        options={MINUTE_OPTIONS}
        tone="card"
        borderColor={COLORS.lineWarm}
      />
      <span>of</span>
      <FieldSelect
        label="Drive to"
        value={filters.dest}
        onChange={(v) => onChange("dest", v)}
        options={DEST_OPTIONS}
        tone="card"
        borderColor={COLORS.lineWarm}
      />
      <Box component="span" sx={{ fontSize: 13, color: COLORS.body }}>
        Typical weekday morning drive
      </Box>
    </Box>
  );
}
