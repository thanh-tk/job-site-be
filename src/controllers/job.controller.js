import prisma from "../config/db.js";

async function getJobList(req, res) {
  try {
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
    const query = {
      where: {},
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
    };
    const [jobs, count] = await prisma.$transaction([
      prisma.job.findMany(query),
      prisma.job.count({ where: query.where }),
    ]);


    const reData = {
      totalPage: count,
      dataList: [...jobs],
    };
    // Return the jobs to the client
    return res.json(reData);
  } catch (e) {
    res.status(500).json({ error:  e.toString() });
  }
}

// Function to create a new job
async function createJob(req, res) {
  // Retrieve the job data from the request body
  const Jobdata = req.body;

  // Use the Prisma client to create a new job with the provided data
  const company = await prisma.company.findMany({where:{}});
  Jobdata["companyId"] = company[0].id
  try {
    const job = await prisma.job.create({ data: Jobdata });

    // Send the new job data as a JSON response
    res.status(200).json(job);
  } catch (e) {
    // Respond with the created job as a JSON object
    res.status(500).json({ error:  e.toString() });
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
    res.status(500).json({ error:  e.toString() });
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
    res.status(500).json({ error:  e.toString() });
  }
}

// Route handler to delete a job
async function deleteJob(req, res) {
  try {
    // Get job ID from request parameters
    const { id } = req.params;

    // Delete job using Prisma client
    const deletedJob = await prisma.job.delete({
      where: {
        id: id,
      },
    });

    // Return deleted job with 200 status code
    res.status(200).json(deletedJob);
  } catch (e) {
    
    // Handle error and return 500 status code
    res.status(500).json({ error:  e.toString() });
  }
}
export default {
  getJobList,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
