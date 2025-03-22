import { Treatment, DailyTreatment } from "../model/schema.js";

//function to record a new treatment for a patient
export const recordTreatement = async (req, res) => {
  const { patientId, diagnosis, treatment, medicine } = req.body;
  const roles = ["Doctor", "Nurse"];
  const user = req.user;

  //checking if the user has the required role
  if (!roles.includes(user.role)) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  if (!patientId) {
    return res.status(400).json({ message: "Patient ID is required!" });
  }

  //validating that diagnosis, treatment, and medicine are provided
  if (!diagnosis || !treatment || !medicine) {
    return res
      .status(400)
      .json({ message: "Diagnosis, treatment, and medicine are required!" });
  }

  //creating a new treatment instance
  const newTreatment = new Treatment({
    patientId,
    diagnosis,
    treatment,
    medicine,
  });

  try {
    //saving a new treatment to the database
    const treatment = await newTreatment.save();
    res.status(201).json(treatment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

//function to updating an existing treatment
export const updateTreatment = async (req, res) => {
  const diagnosisId = req.params.id;
  const { treatment, medicine } = req.body;
  const roles = ["Doctor", "Nurse"];
  const user = req.user;

  //checking if the user has the required role
  if (!roles.includes(user.role)) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  //validating that diagnosisId is provided
  if (!diagnosisId) {
    return res.status(400).json({ message: "Diagnosis ID is required!" });
  }

  //validating that at least one of treatment or medicine is provided
  if (!treatment && !medicine) {
    return res
      .status(400)
      .json({ message: "At least one of treatment or medicine is required!" });
  }

  try {
    //updating the treatment in the database
    const updatedTreatment = await Treatment.findOneAndUpdate({
      diagnosisId,
      treatment,
      medicine,
    });

    res.status(200).json(updatedTreatment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//function to get treatment details by diagnosis ID
export const getTreatment = async (req, res) => {
  try {
    const diagnosisId = req.params.id;

    if (!diagnosisId) {
      return res.status(400).json({ message: "Diagnosis ID is required!" });
    }

    const treatment = await Treatment.find({ diagnosisId });

    if (!treatment) {
      return res.status(404).json({ message: "Treatment not found!" });
    }

    res.status(200).json(treatment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//function to record a new diagnosis
export const recordDiagnosis = async (req, res) => {
  const { diagnosisId, diagnosis } = req.body;
  const roles = ["Doctor"];
  const user = req.user;

  if (!roles.includes(user.role)) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  if (!diagnosisId) {
    return res.status(400).json({ message: "Diagnosis ID is required!" });
  }

  if (!diagnosis) {
    return res.status(400).json({ message: "Diagnosis is required!" });
  }

  try {
    const updatedDiagnosis = await Treatment.findOneAndUpdate({
      diagnosisId,
      diagnosis,
    });
    res.status(200).json(updatedDiagnosis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//function to get diagnosis details by diagnosis ID
export const getDiagnosis = async (req, res) => {
  try {
    const diagnosisId = req.params.id;
    if (!diagnosisId) {
      return res.status(400).json({ message: "Diagnosis ID is required!" });
    }

    const diagnosis = await Treatment.find({ diagnosisId });

    if (!diagnosis) {
      return res.status(404).json({ message: "Diagnosis not found!" });
    }

    res.status(200).json(diagnosis);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//function to record daily treatment details
export const recordDailyTreatment = async (req, res) => {
  const { diagnosisId, intake, output, progress } = req.body;
  const roles = ["Doctor", "Nurse"];
  const user = req.user;

  if (!roles.includes(user.role)) {
    return res.status(403).json({ message: "Unauthorized!" });
  }

  if (!diagnosisId) {
    return res.status(400).json({ message: "Diagnosis ID is required!" });
  }

  //validating that at least one of intake, output, or progress is provided
  if (!intake && !output && !progress) {
    return res.status(400).json({
      message: "At least one of intake, output, or progress is required!",
    });
  }

  //creating a new daily treatment instance
  const newDailyTreatment = new DailyTreatment({
    diagnosisId,
    intake,
    output,
    progress,
  });

  try {
    const dailyTreatment = await newDailyTreatment.save();
    res.status(201).json(dailyTreatment);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

// function to get daily treatment details by diagnosis ID
export const getDailyTreatment = async (req, res) => {
  try {
    const diagnosisId = req.params.id;
    // validate that diagnosisId is provided
    if (!diagnosisId) {
      return res.status(400).json({ message: "Diagnosis ID is required!" });
    }

    // find daily treatment by diagnosisId
    const dailyTreatment = await DailyTreatment.find({ diagnosisId });
    // check if daily treatment exists
    if (!dailyTreatment) {
      return res.status(404).json({ message: "Daily treatment not found!" });
    }

    res.status(200).json(dailyTreatment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

//function to sign off treatment
export const signOffTreatment = async (req, res) => {
  const { diagnosisId, signedOff } = req.body;
  try {
    if (!diagnosisId) {
      return res.status(400).json({ message: "Diagnosis ID is required!" });
    }

    if (signedOff === undefined) {
      return res.status(400).json({ message: "Signed off is required!" });
    }

    const treatment = await Treatment.findByIdAndUpdate(
      diagnosisId,
      { signedOff },
      { new: true }
    );

    res.status(200).json(treatment);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};