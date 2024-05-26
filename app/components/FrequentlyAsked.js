import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

export default function FrequentlyAsked() {
  return (
    <div className="container">
      <Accordion defaultExpanded>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1-content"
          id="panel1-header"
        >
          <Typography>What is BannerAI exactly?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            BannerAI is a website that lets you create graphics of any sort with
            just a click.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>How is this possible?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Using the power of AI under the hood, in just one simple click, you
            can create any graphics as far as your imagination can reach.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
