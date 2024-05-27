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
            BannerAI is a website that lets you create graphics of any kind with
            just one click using the power of AI.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>How to use BannerAI?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            First, type in the text you want to include in the graphics. Then,
            input the description of the image you want the AI to generate.
            Finally, click the generate button. <br /> <br />
            After a few seconds, the generated graphics will be displayed. You
            can edit the text as much as you want. When done, you can click the
            download button to save it to your device.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>What can I create with BannerAI?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            You can create blog banners, birthday greeting cards, book covers,
            or anything that requires an image with a text overlay.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2-content"
          id="panel2-header"
        >
          <Typography>Can I use BannerAI for free?</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            BannerAI can be used to generate up to
            {` ${process.env.NEXT_PUBLIC_GENERATION_LIMIT}`} graphics
            per day for free; no sign-up is required. A pro version will be
            created soon, which lets you generate unlimited graphics.
          </Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
