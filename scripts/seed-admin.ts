import readline from "node:readline";

import { connectDatabase } from "../src/config/database.js";
import { AdminModel } from "../src/models/admin.model.js";
import { hashPassword } from "../src/services/auth.service.js";

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ask = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    rl.question(question, resolve);
  });
};

const askHidden = (question: string): Promise<string> => {
  return new Promise((resolve) => {
    process.stdout.write(question);

    const stdin = process.stdin;
    let password = "";

    const onData = (data: Buffer) => {
      const input = data.toString();

      if (
        input === "\n" ||
        input === "\r" ||
        input === "\r\n"
      ) {
        stdin.setRawMode?.(false);
        stdin.pause();
        stdin.removeListener("data", onData);

        process.stdout.write("\n");
        resolve(password);
        return;
      }

      if (input === "\u0003") {
        process.stdout.write("\n");
        process.exit(1);
      }

      if (input === "\u007f") {
        password = password.slice(0, -1);
        return;
      }

      password += input;
    };

    stdin.setRawMode?.(true);
    stdin.resume();
    stdin.on("data", onData);
  });
};

const seedAdmin = async (): Promise<void> => {
  try {
    await connectDatabase();

    console.log("\n🔐 Create Portfolio Admin\n");

    const firstName = (
      await ask("First name: ")
    ).trim();

    const lastName = (
      await ask("Last name: ")
    ).trim();

    const email = (
      await ask("Email: ")
    )
      .trim()
      .toLowerCase();

    const password = await askHidden(
      "Password: "
    );

    if (!firstName || !lastName || !email || !password) {
      throw new Error(
        "First name, last name, email and password are required"
      );
    }

    if (password.length < 8) {
      throw new Error(
        "Password must be at least 8 characters"
      );
    }

    const existingAdmin = await AdminModel.findOne({
      email,
    })
      .lean()
      .exec();

    if (existingAdmin) {
      throw new Error(
        "An admin with this email already exists"
      );
    }

    const hashedPassword = await hashPassword(password);

    await AdminModel.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role: "Admin",
    });

    console.log("\n✅ Admin account created successfully");
    console.log(`📧 Email: ${email}`);
    console.log("🔑 Password: stored securely as a hash");
  } catch (error) {
    console.error(
      "\n❌ Failed to create admin:",
      error instanceof Error
        ? error.message
        : error
    );

    process.exitCode = 1;
  } finally {
    rl.close();
  }
};

seedAdmin();