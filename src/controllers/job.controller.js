import prisma  from "../config/db.js";

async function getJobList(req, res) {
  // Get the `page` query parameter
  const page = req.query["page"];

  // Get the `sort` query parameter
  const sort = req.query["sort"];

  // Parse the `page` query parameter into a number
  const pageNumber = parseInt(page["number"]) || 1;

  // Parse the `pageSize` query parameter into a number
  const pageSize = parseInt(page["size"]) || 10;


  // Query the database for jobs, limited by the `pageSize` and `pageNumber` parameters
  // and sorted by the `sort` parameter, if provided.
  const jobs = await prisma.job.findMany({
    take: pageSize,
    skip: (pageNumber - 1) * pageSize,
    orderBy: sort
      ? {
          // If a `sort` parameter is provided, order the results by the specified column
          // in the specified direction.
          [sort["col"] || "createdAt"]: sort["dir"] || "asc",
        }
      : {
          // If a `sort` parameter is not provided, order the results by the `createdAt`
          // column in descending order.
          createdAt: "desc",
        },
  });

  // Return the jobs to the client
  res.json(jobs);
}

// Function to create a new job
async function createJob(req, res) {
  // Retrieve the job data from the request body
  const Jobdata = req.body;

  // Use the Prisma client to create a new job with the provided data
  try {
  const job = await prisma.job.create({ data: Jobdata });

  // Send the new job data as a JSON response
  res.status(200).json(job);
  } catch (e) {
    // Respond with the created job as a JSON object
    res.status(500).json({ error: e });
  }
}

// Retrieve a single job from the database
async function getJob(req, res) {
  try {
    // Get job ID from request parameters
    const { id } = req.params;

    // Fetch job data from the database using Prisma
    const job = await prisma.job.findUnique({
      where: {
        id: String(id),
      },
    });

    // Send the job data as a JSON response
    res.status(200).json(job);
  } catch (e) {
    // If an error occurs, send an error response
    res.status(500).json({ error: e });
  }
}

//Update Job to the database using Job ID
async function updateJob(req, res) {
  // retrieve id and data from request
  const { id } = req.params;
  const updatedData = req.body;

  try {
    // update job in database
    const updatedJob = await prisma.job.update({
      where: {
        id: String(id),
      },
      data: updatedData,
    });

    // return updated job with 200 status
    res.status(200).json(updatedJob);
  } catch (e) {
    // handle error by returning it with 500 status
    res.status(500).json({ error: e });
  }
}

// Route handler to delete a blog post
async function deleteJob(req, res) {
  try {
    // Get post ID from request parameters
    const { id } = req.params;

    // Delete post using Prisma client
    const deletedBlogPost = await prisma.post.delete({
      where: {
        id: Number(id),
      },
    });

    // Return deleted post with 200 status code
    res.status(200).json(deletedBlogPost);
  } catch (e) {
    // Handle error and return 500 status code
    res.status(500).json({ error: e });
  }
}
export default {
  getJobList,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
