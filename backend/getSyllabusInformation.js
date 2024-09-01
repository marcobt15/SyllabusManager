require('dotenv').config({path: '../.env'});
const { GoogleGenerativeAI } = require("@google/generative-ai");

// Initialize the Google Generative AI instance
console.log(process.env.GOOGLE_API_KEY)
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    generationConfig: { responseMimeType: "application/json" }
});

// Define the prompt template
const temp_prompt = `Extract ALL assignment, quiz, test, exam, midterm dates or a date close to it like the tutorial date and how much each item is worth.
You might read that quizzes in total are 40%, check how many quizzes there are and do the calculation. Also watch out for quizzes being best 8 of 10. For example if somewhere says quizzes: 40% and there are 10 quizzes but it also says best 8 out of 10, make sure to divide 40 by 8 and not 10 to get the percentage for each.
IF YOU DON'T KNOW THE ANSWER JUST PUT N/A AND DOUBLE CHECK THAT ALL ASSIGNMENTS, QUIZZES, TESTS, EXAMS, AND MIDTERMS ARE RETRIEVED
Extract the information using this JSON schema:
{ "assignment1" : {"name": {"type":"string"}, "due date" : {"type":"date"}, "percentage" : {"type":"number"}},
  "assignment2" : {"name": {"type":"string"}, "due date" : {"type":"date"}, "percentage" : {"type":"number"}}
    ...
}

Here is the text below:

{$TEXT}
`;

// Function to generate syllabus information
async function getSyllabusInformation(pdfText) {
    const prompt = temp_prompt.replace('{$TEXT}', pdfText);

    try {
        const result = await model.generateContent(prompt);
        return result.response.text();
    } catch (error) {
        console.error('Error generating content:', error);
        throw error; // Propagate the error to be handled by the caller
    }
}

// Export the function
module.exports = getSyllabusInformation;
