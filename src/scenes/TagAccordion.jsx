import {
  Box,
  useTheme,
  IconButton,
  Tooltip,
  Chip,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ExpandMore as ExpandMoreIcon,
  Delete as DeleteIcon,
} from "@mui/icons-material";
import { tokens } from "../Theme.js";

const TagAccordion = ({ title, tags, content, onDelete }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const handleDelete = () => {
    onDelete(); // Call onDelete prop function passed from News component
  };

  return (
    <Accordion
      defaultExpanded
      sx={{
        backgroundColor: colors.primary[400],
        boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
        borderRadius: "8px",
        marginBottom: "16px",
        "&:before": {
          display: "none", // Removes default border
        },
      }}
    >
      <AccordionSummary
        expandIcon={
          <ExpandMoreIcon
            sx={{
              color: colors.greenAccent[400],
            }}
          />
        }
        sx={{
          padding: "8px 16px",
          "& .MuiAccordionSummary-content": {
            alignItems: "center",
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          },
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            color={colors.greenAccent[500]}
            variant="h6"
            sx={{
              fontWeight: "bold",
              marginRight: "8px", // Adjust the space between title and chips
            }}
          >
            {title}
          </Typography>
          <Box display="flex" flexWrap="wrap" gap="8px">
            {tags.map((tag, index) => (
              <Chip
                key={index}
                label={tag.tag_name}
                sx={{
                  backgroundColor: colors.blueAccent[500],
                  color: colors.greenAccent[100],
                  fontSize: "0.85rem",
                  height: "24px",
                }}
              />
            ))}
          </Box>
        </Box>
        <Tooltip title="Delete">
          <IconButton
            onClick={handleDelete}
            sx={{
              color: colors.redAccent[400],
              "&:hover": {
                backgroundColor: colors.redAccent[100],
              },
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          backgroundColor: colors.primary[400],
          padding: "16px",
          borderTop: `1px solid ${colors.grey[700]}`,
        }}
      >
        <Typography
          sx={{
            color: colors.grey[100],
            fontSize: "0.95rem",
            lineHeight: "1.5",
          }}
        >
          {content}
        </Typography>
      </AccordionDetails>
    </Accordion>
  );
};

export default TagAccordion;
