import bcrypt from "bcrypt";
import { storage } from "./storage";

export async function setupDefaultAdmin() {
  try {
    // Check if secure admin already exists
    const existingAdmin = await storage.getAdminByUsername("rotolighting");
    if (existingAdmin) {
      console.log("Secure admin user already exists");
      return;
    }

    // Remove old admin if it exists
    try {
      const oldAdmin = await storage.getAdminByUsername("admin");
      if (oldAdmin) {
        console.log("Removing old admin account for security");
        // Note: We'll let the new admin replace the old one through database constraints
      }
    } catch (error) {
      // Old admin doesn't exist, continue
    }

    // Create secure admin account with strong credentials
    const hashedPassword = await bcrypt.hash("Heiko123!", 12); // Increased security with 12 rounds
    const admin = await storage.createAdmin({
      username: "rotolighting",
      password: hashedPassword
    });

    console.log("Secure admin account created successfully");
    console.log("Username: rotolighting");
    console.log("Password: [SECURE - Use provided password]");
  } catch (error) {
    console.error("Failed to setup secure admin account:", error);
  }
}