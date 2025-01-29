"use server";
import Ticket from "@/database/ticket.model";
import { connectToDatabase } from "@/lib/mongoose";

export interface CreateTicketProps {
  type: string;
  title: string;
  platform: string;
  link: string;
  points: number;
  finisher: string[];
}

export const createTicket = async ({ finisher, link, platform, points, title, type }: CreateTicketProps) => {
  try {
    connectToDatabase();

    await Ticket.create({
      type,
      title,
      platform,
      link,
      points,
      finisher,
    })
  } catch (error) {
    console.error("Error creating special access", error);
    return false;
  }
}

export const finishTicket = async (id: string, finisher: string) => {
  try {
    connectToDatabase();

    const ticket = await Ticket.findById(id);
    if (!ticket) return false;

    ticket.finisher.push(finisher);
    ticket.save();
  } catch (error) {
    console.error("Error finishing ticket", error);
    return false;
  }
}

export const checkTicket = async (id: string, finisher: string) => {
  try {
    connectToDatabase();

    const ticket = await Ticket.findById(id);
    if (!ticket) return false;

    return ticket.finisher.includes(finisher);
  } catch (error) {
    console.error("Error checking ticket", error);
    return false;
  }
}

export const getTickets = async () => {
  try {
    connectToDatabase();

    return await Ticket.find();
  } catch (error) {
    console.error("Error getting tickets", error);
    return [];
  }
}