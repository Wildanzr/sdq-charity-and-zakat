"use server";
import Access from "@/database/access.model";
import { connectToDatabase } from "@/lib/mongoose";

export interface CreateSpecialAccessProps {
  title: string;
  image: string;
  price: number;
  total: number;
  details: string;
  privateContent: string;
  dueDate: Date;
}

export const createSpecialAccess = async (params: CreateSpecialAccessProps) => {
  try {
    connectToDatabase();

    const { title, image, price, total, details, privateContent, dueDate } = params;
    const ticket = await Access.create({
      title,
      image,
      price,
      total,
      details,
      privateContent,
      dueDate,
    });
  } catch (error) {
    console.error("Error creating special access", error);
    return false;
  }
}

export const claimSpecialAccess = async (id: string, claimer: string) => {
  try {
    connectToDatabase();

    const ticket = await Access.findById(id);
    if (!ticket) {
      return false;
    }

    ticket.claimers.push(claimer);
    ticket.sold += 1;
    await ticket.save();

    return JSON.stringify(ticket);
  } catch (error) {
    console.error("Error claiming special access", error);
    return false;
  }
}

export const getMySpecialAccess = async (claimer?: string) => {
  try {
    connectToDatabase();
    if (!claimer) {
      return []
    }

    const tickets = await Access.find({ claimers: claimer });
    return tickets;
  } catch (error) {
    console.error("Error getting special access", error);
    return false;
  }
}

export const getPassedSpecialAccess = async (claimer?: string) => {
  try {
    connectToDatabase();
    if (!claimer) {
      return []
    }

    const currentDate = new Date();
    const tickets = await Access.find({ dueDate: { $lt: currentDate } });

    if (claimer) {
      const filteredTickets = tickets.filter((ticket) => ticket.claimers.includes(claimer));
      return filteredTickets;
    } else {
      return tickets;
    }
  } catch (error) {
    console.error("Error getting special access", error);
    return false;
  }
}

export const getAvailableSpecialAccess = async (claimer?: string) => {
  try {
    connectToDatabase();
    if (!claimer) {
      return []
    }

    const tickets = await Access.find({ dueDate: { $gt: new Date() } });
    if (claimer) {
      const filteredTickets = tickets.filter((ticket) => !ticket.claimers.includes(claimer));
      return filteredTickets;
    } else {
      return tickets;
    }

  } catch (error) {
    console.error("Error getting special access", error);
    return false;
  }
}

export const getSpecialAccess = async (id: string) => {
  try {
    connectToDatabase();

    const ticket = await Access.findById(id);
    if (!ticket) {
      return false;
    }
    return ticket;
  } catch (error) {
    console.error("Error getting special access", error);
    return false;
  }
}