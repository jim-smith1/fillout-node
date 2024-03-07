const axios = require("axios");
const { convertValue } = require("../../libs/ConvertValue");

const registerFormRoutes = (apiRouter) => {
  apiRouter.get("/:formId/filteredResponses", async (req, res) => {
    try {
      const { formId } = req.params;
      const filters = req.body || [];

      // Construct URL with formId and API key
      const url = `https://api.fillout.com/v1/api/forms/${formId}/submissions`;

      // Fetch responses from Fillout.com API
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${process.env.FILLOUT_API_KEY}`,
          "Content-Type": "application/json",
        },
      });

      // Filter responses based on provided filters
      const filteredResponses = response.data.responses.filter((response) => {
        for (const filter of filters) {
          const question = response.questions.find((q) => q.id === filter.id);
          if (!question) return false;

          // Convert value to appropriate type
          const filterValue = convertValue(filter.value);
          const questionValue = convertValue(question.value);

          // Apply condition based on filter type
          switch (filter.condition) {
            case "equals":
              // Use strict equality for comparison
              if (questionValue === filterValue) break;
              return false;
            case "does_not_equal":
              if (questionValue !== filterValue) break;
              return false;
            case "greater_than":
              if (!(questionValue > filterValue)) break;
              return false;
            case "less_than":
              if (!(questionValue < filterValue)) break;
              return false;
            default:
              return false;
          }
        }
        return true;
      });

      res.json({
        responses: filteredResponses,
        totalResponses: filteredResponses.length,
        pageCount: 1,
      });
    } catch (error) {
      console.error("Error:", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
};

module.exports = { registerFormRoutes };
