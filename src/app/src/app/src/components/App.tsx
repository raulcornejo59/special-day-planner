"use client";
import { useState, useEffect } from "react";

// ─── DESIGN TOKENS ───────────────────────────────────────────────────────────
const T = {
  blush: "#F2C4CE",
  mauve: "#6B3A4D",
  deepMauve: "#4A2535",
  champagne: "#F5E6C8",
  gold: "#C9A84C",
  ivory: "#FDFAF6",
  slate: "#2C2C3A",
  muted: "#8A7F87",
  success: "#4CAF84",
  warning: "#E8A020",
  danger: "#D64545",
  white: "#FFFFFF",
  border: "#EDE0E6",
};

// ─── REAL DATA FROM 2026 JAN–JUNE PLANNER PDF ────────────────────────────────
const MOCK_EVENTS = [
  // ── JANUARY ──
  { id:1,  title:"Proposal – Kylon",               event_type:"Proposal", event_date:"2026-01-16", start_time:"4:15 PM",  location:"Norco",                                      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Kylon",               contact:"",                  amount:1450, expenses:80,  emp_cost:130, emp_notes:"Fern $130",          net:1240, payment:"CashApp",        flowers:"All white, no sign",                          notes:"Photography. Videography $650 to Rima ($250 done).",             assigned_staff:["Fern"], month:"January" },
  { id:2,  title:"Proposal – Armando",              event_type:"Proposal", event_date:"2026-01-18", start_time:"5:00 PM",  location:"2404 Wilshire Blvd Unit 10A, Los Angeles",   status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Armando",             contact:"(951) 662-0915",    amount:1800, expenses:100, emp_cost:100, emp_notes:"Mom $100",           net:1600, payment:"Zelle",          flowers:"50 white rose bouquet",                       notes:"Photography + additional hour. Rental: 50 rose white bouquet.",  assigned_staff:["Mom"], month:"January" },
  { id:3,  title:"Proposal – Manny & Briana",       event_type:"Proposal", event_date:"2026-01-23", start_time:"12:20 PM", location:"Dana Point",                                 status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Manny & Briana",      contact:"714-809-4572",      amount:1460, expenses:170, emp_cost:155, emp_notes:"Fern $130, Mom $25", net:1135, payment:"$300 Zelle, rest cash", flowers:"25 red rose bouquet",                    notes:"Photography.",                                                   assigned_staff:["Fern","Mom"], month:"January" },
  { id:4,  title:"Proposal – Wuillever",            event_type:"Proposal", event_date:"2026-01-31", start_time:"4:30 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Wuillever",           contact:"",                  amount:1160, expenses:90,  emp_cost:155, emp_notes:"Fern $130, Mom $25", net:915,  payment:"Zelle",          flowers:"25 white rose bouquet",                       notes:"Photography.",                                                   assigned_staff:["Fern","Mom"], month:"January" },
  // ── FEBRUARY ──
  { id:5,  title:"Proposal – Jorge",                event_type:"Proposal", event_date:"2026-02-07", start_time:"4:30 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Jorge",               contact:"",                  amount:1600, expenses:150, emp_cost:290, emp_notes:"Fern $130, Mom $160",net:1160, payment:"$300 Zelle, rest cash", flowers:"50 white roses",                         notes:"Photography. Guests <15, musician.",                              assigned_staff:["Fern","Mom"], month:"February" },
  { id:6,  title:"Rental – Loulya",                 event_type:"Rental",   event_date:"2026-02-08", start_time:"10:30 AM", location:"100 Whispering Trail, Irvine CA 92602",      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Loulya",              contact:"",                  amount:250,  expenses:0,   emp_cost:0,   emp_notes:"",                   net:250,  payment:"Zelle/Cash",     flowers:"",                                            notes:"Delivery & pickup included. Rental: red heart.",                 assigned_staff:[], month:"February" },
  { id:7,  title:"Proposal – Pablo & Elizabeth",    event_type:"Proposal", event_date:"2026-02-12", start_time:"3:00 PM",  location:"Norco",                                      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Pablo & Elizabeth",   contact:"718-501-3436",      amount:1650, expenses:0,   emp_cost:130, emp_notes:"Mom $130",           net:1520, payment:"$300 Zelle, $1350 cash", flowers:"25 red rose bouquet",                 notes:"Photography. $750 to Rima ($250 done).",                         assigned_staff:["Mom"], month:"February" },
  { id:8,  title:"Rental – Samantha",               event_type:"Rental",   event_date:"2026-02-13", start_time:"9:30 AM",  location:"",                                           status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Samantha",            contact:"949-309-7232",      amount:250,  expenses:0,   emp_cost:0,   emp_notes:"",                   net:250,  payment:"Zelle",          flowers:"",                                            notes:"Rental: red heart and sign.",                                    assigned_staff:[], month:"February" },
  { id:9,  title:"Proposal – John & Evelyn",        event_type:"Proposal", event_date:"2026-02-14", start_time:"1:00 PM",  location:"Dana Point",                                 status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"John & Evelyn",       contact:"323-424-9817",      amount:1700, expenses:100, emp_cost:260, emp_notes:"Mom $120, Fern $140",net:1340, payment:"$500 Zelle, $1200 cash", flowers:"Rose bouquets",                       notes:"Photography.",                                                   assigned_staff:["Fern","Mom"], month:"February" },
  { id:10, title:"Proposal – Sir Ray & Cynthia",    event_type:"Proposal", event_date:"2026-02-14", start_time:"6:30 PM",  location:"Wilshire",                                   status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Sir Ray & Cynthia",   contact:"",                  amount:2000, expenses:140, emp_cost:240, emp_notes:"Fern $140, Mom $100",net:1620, payment:"Zelle",          flowers:"50 red roses, YOU+ME SIGN",                   notes:"3 hrs with setup.",                                              assigned_staff:["Fern","Mom"], month:"February" },
  { id:11, title:"Photoshoot – Manny",              event_type:"Photoshoot",event_date:"2026-02-20",start_time:"1:30 PM",  location:"Laguna Courthouse",                          status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Manny",               contact:"",                  amount:300,  expenses:0,   emp_cost:100, emp_notes:"Fern $100",          net:200,  payment:"Zelle",          flowers:"",                                            notes:"Photography only.",                                              assigned_staff:["Fern"], month:"February" },
  { id:12, title:"Proposal – Tyler & Annie",        event_type:"Proposal", event_date:"2026-02-20", start_time:"8:00 PM",  location:"DTLA",                                       status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Tyler & Annie",       contact:"(203) 631-7771",    amount:1400, expenses:135, emp_cost:270, emp_notes:"Fern $270",          net:995,  payment:"Zelle",          flowers:"50 rose bouquet",                             notes:"Photography.",                                                   assigned_staff:["Fern"], month:"February" },
  { id:13, title:"Proposal – Eddie (Langham)",      event_type:"Proposal", event_date:"2026-02-21", start_time:"4:00 PM",  location:"Langham Hotel",                              status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Eddie",               contact:"",                  amount:1250, expenses:70,  emp_cost:600, emp_notes:"Liz $600",           net:580,  payment:"Zelle",          flowers:"50 white rose bouquet",                       notes:"",                                                               assigned_staff:["Liz"], month:"February" },
  { id:14, title:"Proposal – Emiliano & Amy",       event_type:"Proposal", event_date:"2026-02-21", start_time:"3:40 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Emiliano & Amy",      contact:"",                  amount:500,  expenses:66,  emp_cost:130, emp_notes:"Fern $130",          net:334,  payment:"Zelle/Cash",     flowers:"",                                            notes:"Photography.",                                                   assigned_staff:["Fern"], month:"February" },
  { id:15, title:"Proposal – Seneca & Tia",         event_type:"Proposal", event_date:"2026-02-21", start_time:"5:00 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Seneca & Tia",        contact:"",                  amount:1010, expenses:88,  emp_cost:350, emp_notes:"Fern $130, Mom $220",net:572,  payment:"$300 CashApp, $710 Apple Cash", flowers:"25 white rose bouquet",          notes:"No photography.",                                                assigned_staff:["Fern","Mom"], month:"February" },
  // ── MARCH ──
  { id:16, title:"Proposal – Angel & Gina",         event_type:"Proposal", event_date:"2026-03-01", start_time:"5:20 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Angel & Gina",        contact:"",                  amount:1150, expenses:70,  emp_cost:30,  emp_notes:"Mom $30",            net:1050, payment:"Zelle/Cash",     flowers:"Pink setup",                                  notes:"Photography. Rental: pink theme.",                               assigned_staff:["Mom"], month:"March" },
  { id:17, title:"Proposal – Michael (BH)",         event_type:"Proposal", event_date:"2026-03-09", start_time:"6:30 PM",  location:"13810 Mulholland Dr, Beverly Hills",         status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Michael",             contact:"",                  amount:1510, expenses:154, emp_cost:130, emp_notes:"Mom $130",           net:1226, payment:"Zelle",          flowers:"50 white rose bouquet, all white",            notes:"Photography.",                                                   assigned_staff:["Mom"], month:"March" },
  { id:18, title:"Proposal – Jayy",                 event_type:"Proposal", event_date:"2026-03-10", start_time:"5:10 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Jayy",                contact:"",                  amount:800,  expenses:66,  emp_cost:130, emp_notes:"Mom $130",           net:604,  payment:"Zelle/Cash",     flowers:"",                                            notes:"Photography.",                                                   assigned_staff:["Mom"], month:"March" },
  { id:19, title:"Proposal – Nate (Heisler)",       event_type:"Proposal", event_date:"2026-03-14", start_time:"5:50 PM",  location:"Heisler Park",                               status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Nate",                contact:"(626) 499-9197",    amount:1000, expenses:44,  emp_cost:130, emp_notes:"Fern $130",          net:826,  payment:"Zelle",          flowers:"50 pink rose bouquet",                        notes:"",                                                               assigned_staff:["Fern"], month:"March" },
  { id:20, title:"Proposal – Raz",                  event_type:"Proposal", event_date:"2026-03-18", start_time:"6:20 PM",  location:"Norco",                                      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Raz",                 contact:"",                  amount:1550, expenses:175, emp_cost:130, emp_notes:"Mom $130",           net:1245, payment:"Zelle",          flowers:"25 white rose bouquet, brown draping, white petals",          notes:"$250 to Rima done ($700 total).",                                assigned_staff:["Mom"], month:"March" },
  { id:21, title:"Proposal – (714) 804-9047",       event_type:"Proposal", event_date:"2026-03-20", start_time:"6:20 PM",  location:"Norco",                                      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"(714) 804-9047",      contact:"(714) 804-9047",    amount:1350, expenses:125, emp_cost:130, emp_notes:"Fern $130",          net:1095, payment:"Zelle",          flowers:"",                                            notes:"Photography. $700 Rima ($250 done).",                            assigned_staff:["Fern"], month:"March" },
  { id:22, title:"Proposal – Jerry & Karla",        event_type:"Proposal", event_date:"2026-03-21", start_time:"4:40 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Jerry & Karla",       contact:"",                  amount:960,  expenses:80,  emp_cost:130, emp_notes:"Fern $130",          net:750,  payment:"Zelle",          flowers:"50 red rose bouquet",                         notes:"Photography, 6 guests.",                                         assigned_staff:["Fern"], month:"March" },
  { id:23, title:"Proposal – Bruno",                event_type:"Proposal", event_date:"2026-03-25", start_time:"6:20 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Bruno",               contact:"",                  amount:880,  expenses:110, emp_cost:50,  emp_notes:"Mom $50",            net:720,  payment:"Zelle",          flowers:"50 white rose bouquet",                       notes:"5 white bunches.",                                               assigned_staff:["Mom"], month:"March" },
  { id:24, title:"Proposal – Manny & Miranda (DTLA)",event_type:"Proposal",event_date:"2026-03-28", start_time:"7:00 PM",  location:"DTLA",                                       status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Manny & Miranda",     contact:"",                  amount:1500, expenses:150, emp_cost:50,  emp_notes:"Fern $50",           net:1300, payment:"Zelle/Cash",     flowers:"50 red rose bouquet",                         notes:"Candice $600.",                                                  assigned_staff:["Fern"], month:"March" },
  // ── APRIL ──
  { id:25, title:"Proposal – Jesse & Gloria",       event_type:"Proposal", event_date:"2026-04-06", start_time:"7:00 PM",  location:"Doris Walker Overlook",                      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Jesse & Gloria",      contact:"",                  amount:1320, expenses:165, emp_cost:150, emp_notes:"Mom $150",           net:1055, payment:"$300 Zelle, rest cash", flowers:"Pink and white off to the side",             notes:"",                                                               assigned_staff:["Mom"], month:"April" },
  { id:26, title:"Proposal – Jess (Long Beach)",    event_type:"Proposal", event_date:"2026-04-11", start_time:"4:30 PM",  location:"2301 E 10th St, Long Beach CA 90804",        status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Jess",                contact:"",                  amount:500,  expenses:0,   emp_cost:130, emp_notes:"Fern $130",          net:420,  payment:"Zelle",          flowers:"",                                            notes:"",                                                               assigned_staff:["Fern"], month:"April" },
  { id:27, title:"Proposal – Oscar (Palisades)",    event_type:"Proposal", event_date:"2026-04-15", start_time:"4:30 PM",  location:"Palisades Gazebo",                           status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Oscar",               contact:"",                  amount:1500, expenses:410, emp_cost:150, emp_notes:"Mom $150",           net:940,  payment:"Zelle",          flowers:"50 red rose bouquet, 5 bags",                 notes:"Photography. $300 permit fee, $110 floral.",                     assigned_staff:["Mom"], month:"April" },
  { id:28, title:"Pickup – Isaiah",                 event_type:"Pickup",   event_date:"2026-04-16", start_time:"",         location:"Pickup",                                     status:"Confirmed", deposit_paid:false, balance_due:0,    client:"Isaiah",              contact:"(626) 873-4712",    amount:340,  expenses:30,  emp_cost:0,   emp_notes:"",                   net:310,  payment:"Cash",           flowers:"2 bags red rose petals",                      notes:"2 bags red rose petals.",                                        assigned_staff:[], month:"April" },
  { id:29, title:"Proposal – Avshotthat (Norco)",   event_type:"Proposal", event_date:"2026-04-17", start_time:"6:30 PM",  location:"Norco",                                      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Avshotthat",          contact:"",                  amount:1205, expenses:60,  emp_cost:130, emp_notes:"Fern $130",          net:1015, payment:"Zelle",          flowers:"4.5 bags pink roses",                         notes:"Rima $650 done.",                                                assigned_staff:["Fern"], month:"April" },
  { id:30, title:"Proposal – Nataly, Matthew & Giselle",event_type:"Proposal",event_date:"2026-04-19",start_time:"6:40 PM",location:"San Pedro",                                status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Nataly, Matthew & Giselle",contact:"",              amount:1450, expenses:85,  emp_cost:100, emp_notes:"Fern $100",          net:1265, payment:"Zelle/Cash",     flowers:"",                                            notes:"Photography, 2 photographers.",                                  assigned_staff:["Fern"], month:"April" },
  { id:31, title:"Event – Jose (Orange)",           event_type:"Proposal", event_date:"2026-04-25", start_time:"7:00 PM",  location:"Orange",                                     status:"Confirmed", deposit_paid:false, balance_due:0,    client:"Jose",                contact:"",                  amount:0,    expenses:100, emp_cost:0,   emp_notes:"",                   net:0,    payment:"Zelle/Cash",     flowers:"75 roses",                                    notes:"Aya $600.",                                                      assigned_staff:[], month:"April" },
  { id:32, title:"Proposal – Yordin",               event_type:"Proposal", event_date:"2026-04-25", start_time:"6:20 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Yordin",              contact:"",                  amount:1360, expenses:145, emp_cost:120, emp_notes:"Fern $120",          net:1095, payment:"Zelle",          flowers:"",                                            notes:"Photography. Permit done $150.",                                 assigned_staff:["Fern"], month:"April" },
  { id:33, title:"Proposal – CRAM / Caesar (Lake Elsinore)",event_type:"Proposal",event_date:"2026-04-26",start_time:"6:30 PM",location:"41528 Red Car Dr, Lake Elsinore",     status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"CRAM / Caesar",       contact:"",                  amount:1580, expenses:192, emp_cost:180, emp_notes:"Fern $180",          net:1208, payment:"Zelle/Cash",     flowers:"25 white rose bouquet",                       notes:"Photography. Location fee $700 paid in full.",                   assigned_staff:["Fern"], month:"April" },
  { id:34, title:"Proposal – Eddie & Fatima",       event_type:"Proposal", event_date:"2026-04-28", start_time:"6:40 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Eddie & Fatima",      contact:"",                  amount:1100, expenses:75,  emp_cost:130, emp_notes:"Liz $130",           net:895,  payment:"Zelle",          flowers:"",                                            notes:"Permit $150 done.",                                              assigned_staff:["Liz"], month:"April" },
  { id:35, title:"Proposal – La I",                 event_type:"Proposal", event_date:"2026-04-30", start_time:"7:00 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"La I",                contact:"",                  amount:1110, expenses:50,  emp_cost:130, emp_notes:"Liz $130",           net:930,  payment:"Zelle/Cash",     flowers:"25 white rose bouquet",                       notes:"Photography. Song: Do For Love.",                                assigned_staff:["Liz"], month:"April" },
  // ── MAY ──
  { id:36, title:"Drop-off – Rigoouw (Highland)",   event_type:"Delivery", event_date:"2026-05-03", start_time:"1:00 PM",  location:"7595 Lillian Ln, Highland CA 92346",         status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Rigoouw",             contact:"",                  amount:1300, expenses:144, emp_cost:130, emp_notes:"Fern $130",          net:1026, payment:"Zelle/Cash",     flowers:"Sign in Spanish",                             notes:"Drop-off only.",                                                 assigned_staff:["Fern"], month:"May" },
  { id:37, title:"Proposal – Cesar (Lynwood)",      event_type:"Proposal", event_date:"2026-05-09", start_time:"2:00 PM",  location:"5536 Rayborn St, Lynwood CA 90262",          status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Cesar",               contact:"",                  amount:1200, expenses:186, emp_cost:120, emp_notes:"Fern $120",          net:894,  payment:"Zelle/Cash",     flowers:"25 white rose bouquet",                       notes:"",                                                               assigned_staff:["Fern"], month:"May" },
  { id:38, title:"Proposal – FB Client (Heritage Pk)",event_type:"Proposal",event_date:"2026-05-09",start_time:"6:50 PM", location:"Heritage Park, Cerritos",                    status:"Confirmed", deposit_paid:false, balance_due:0,    client:"FB Client",           contact:"",                  amount:600,  expenses:0,   emp_cost:110, emp_notes:"Fern $110",          net:490,  payment:"Apple Pay/Cash", flowers:"",                                            notes:"",                                                               assigned_staff:["Fern"], month:"May" },
  { id:39, title:"Inquiry – (949) 289-6338",        event_type:"Inquiry",  event_date:"2026-05-11", start_time:"",         location:"San Pedro",                                  status:"Inquiry",   deposit_paid:false, balance_due:0,    client:"(949) 289-6338",      contact:"(949) 289-6338",    amount:260,  expenses:0,   emp_cost:0,   emp_notes:"",                   net:260,  payment:"Zelle/Cash",     flowers:"",                                            notes:"",                                                               assigned_staff:[], month:"May" },
  { id:40, title:"Proposal – Client (San Pedro AM)", event_type:"Proposal", event_date:"2026-05-11", start_time:"8:00 AM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Unknown",             contact:"",                  amount:1100, expenses:200, emp_cost:120, emp_notes:"Fern $120",          net:780,  payment:"Zelle/Cash",     flowers:"50 white rose bouquet",                       notes:"",                                                               assigned_staff:["Fern"], month:"May" },
  { id:41, title:"Proposal – Lopez",                event_type:"Proposal", event_date:"2026-05-15", start_time:"7:10 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Lopez",               contact:"",                  amount:1360, expenses:0,   emp_cost:130, emp_notes:"Fern $130",          net:1230, payment:"Zelle/Cash",     flowers:"",                                            notes:"Photography.",                                                   assigned_staff:["Fern"], month:"May" },
  { id:42, title:"Proposal – Nate (Laguna)",        event_type:"Proposal", event_date:"2026-05-16", start_time:"12:00 PM", location:"Laguna",                                     status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Nate",                contact:"",                  amount:500,  expenses:90,  emp_cost:100, emp_notes:"Fern $100",          net:400,  payment:"Zelle",          flowers:"",                                            notes:"",                                                               assigned_staff:["Fern"], month:"May" },
  { id:43, title:"Proposal – Jenan & Miguel",       event_type:"Proposal", event_date:"2026-05-18", start_time:"",         location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Jenan & Miguel",      contact:"",                  amount:700,  expenses:75,  emp_cost:130, emp_notes:"Fern $130",          net:495,  payment:"Zelle",          flowers:"",                                            notes:"Song: Sparks by Coldplay / Parachutes album.",                   assigned_staff:["Fern"], month:"May" },
  { id:44, title:"Proposal – Alex / Josue & Alani", event_type:"Proposal", event_date:"2026-05-22", start_time:"7:10 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Alex / Josue & Alani",contact:"",                  amount:1350, expenses:125, emp_cost:200, emp_notes:"Fern $100, Mom $100",net:1025, payment:"Zelle",          flowers:"50 white rose bouquet",                       notes:"Photography, 3 guests.",                                         assigned_staff:["Fern","Mom"], month:"May" },
  { id:45, title:"Proposal – Angel AB (10 guests)", event_type:"Proposal", event_date:"2026-05-30", start_time:"7:00 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Angel AB",            contact:"",                  amount:1350, expenses:0,   emp_cost:130, emp_notes:"Aileen $130",        net:1220, payment:"Zelle/Cash",     flowers:"",                                            notes:"Photography, 10 guests. Permit done $150.",                      assigned_staff:["Aileen"], month:"May" },
  { id:46, title:"Proposal – Enrique (Yorba Linda)",event_type:"Proposal", event_date:"2026-05-30", start_time:"7:00 PM",  location:"Yorba Linda House",                          status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Enrique",             contact:"",                  amount:1150, expenses:98,  emp_cost:260, emp_notes:"Fern $130, Liz $130",net:792,  payment:"Zelle/Cash",     flowers:"",                                            notes:"10 guests.",                                                     assigned_staff:["Fern","Liz"], month:"May" },
  { id:47, title:"Proposal – Michael (Candice)",    event_type:"Proposal", event_date:"2026-05-31", start_time:"7:00 PM",  location:"Candice",                                    status:"Confirmed", deposit_paid:true,  balance_due:970,  client:"Michael",             contact:"",                  amount:1360, expenses:185, emp_cost:230, emp_notes:"Fern $130, Mom $100",net:945,  payment:"$300 Zelle, rest cash", flowers:"50 red rose bouquet",                notes:"Song: Sabes una cosa.",                                          assigned_staff:["Fern","Mom"], month:"May" },
  // ── JUNE ──
  { id:48, title:"Proposal – Drew (Norco)",         event_type:"Proposal", event_date:"2026-06-06", start_time:"7:10 PM",  location:"Norco",                                      status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Drew",                contact:"",                  amount:1560, expenses:154, emp_cost:180, emp_notes:"Fern $130, Mom $50", net:1226, payment:"Apple Cash",      flowers:"50 white rose bouquet, ALL WHITE",             notes:"Photography. Rima $750.",                                        assigned_staff:["Fern","Mom"], month:"June" },
  { id:49, title:"Proposal – Vinny & Sylena (Cielo)",event_type:"Proposal",event_date:"2026-06-19", start_time:"7:20 PM",  location:"Cielo Farms",                                status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Vinny & Sylena",      contact:"",                  amount:1460, expenses:0,   emp_cost:0,   emp_notes:"Fern",               net:1160, payment:"$300 Zelle, rest cash", flowers:"50 red rose bouquet (no petals, no real candles)", notes:"No photography +$25 parking. Arrive by 6 PM.",            assigned_staff:["Fern"], month:"June" },
  { id:50, title:"Proposal – Mario",                event_type:"Proposal", event_date:"2026-06-20", start_time:"5:00 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:0,    client:"Mario",               contact:"",                  amount:1100, expenses:0,   emp_cost:135, emp_notes:"Fern $135",          net:965,  payment:"Zelle/Cash",     flowers:"50 pink rose bouquet",                        notes:"Song: Perfect by Ed Sheeran.",                                   assigned_staff:["Fern"], month:"June" },
  { id:51, title:"Proposal – Enrique (San Pedro)",  event_type:"Proposal", event_date:"2026-06-20", start_time:"7:10 PM",  location:"San Pedro",                                  status:"Confirmed", deposit_paid:true,  balance_due:1300, client:"Enrique",             contact:"",                  amount:1350, expenses:0,   emp_cost:135, emp_notes:"Fern $135",          net:1215, payment:"Zelle/Cash",     flowers:"50 pink rose bouquet",                        notes:"Photography. Deposit only $50.",                                 assigned_staff:["Fern"], month:"June" },
  { id:52, title:"Proposal – Tyler (San Pedro Jun)",event_type:"Proposal", event_date:"2026-06-26", start_time:"7:10 PM",  location:"San Pedro",                                  status:"Upcoming",  deposit_paid:true,  balance_due:1050, client:"Tyler",               contact:"",                  amount:1250, expenses:0,   emp_cost:0,   emp_notes:"",                   net:1050, payment:"Zelle/Cash",     flowers:"25 white rose bouquet",                       notes:"",                                                               assigned_staff:[], month:"June" },
  // ── FUTURE (July–October) ──
  { id:53, title:"Rental Pickup – White Heart",     event_type:"Pickup",   event_date:"2026-07-10", start_time:"Night before pickup (07/09)", location:"Pickup",               status:"Upcoming",  deposit_paid:true,  balance_due:0,    client:"Unknown",             contact:"",                  amount:0,    expenses:0,   emp_cost:0,   emp_notes:"",                   net:0,    payment:"Zelle/Cash",     flowers:"White heart",                                 notes:"Rental: white heart.",                                           assigned_staff:[], month:"July" },
  { id:54, title:"Proposal – George & Jazmine",     event_type:"Proposal", event_date:"2026-07-18", start_time:"7:20 PM",  location:"2832–2854 Dexter Dr, Riverside CA 92501",    status:"Upcoming",  deposit_paid:true,  balance_due:700,  client:"George & Jazmine",    contact:"626-251-3222",      amount:1000, expenses:0,   emp_cost:400, emp_notes:"Liz $400",           net:600,  payment:"Zelle/Cash",     flowers:"100 white rose bouquet, apple cider",         notes:"Song: My One and Only Love by John.",                            assigned_staff:["Liz"], month:"July" },
  { id:55, title:"Proposal – Tyler (Norco Jul)",    event_type:"Proposal", event_date:"2026-07-18", start_time:"5:30 PM",  location:"Norco",                                      status:"Upcoming",  deposit_paid:true,  balance_due:1000, client:"Tyler",               contact:"",                  amount:1445, expenses:0,   emp_cost:0,   emp_notes:"",                   net:845,  payment:"Zelle/Cash",     flowers:"Peonie bouquet",                              notes:"Rima $300 done ($550 total). Song: Risk It All.",               assigned_staff:[], month:"July" },
  { id:56, title:"Proposal – Jerry & Melissa",      event_type:"Proposal", event_date:"2026-07-18", start_time:"7:10 PM",  location:"Norco",                                      status:"Upcoming",  deposit_paid:true,  balance_due:1050, client:"Jerry & Melissa",     contact:"",                  amount:1350, expenses:0,   emp_cost:0,   emp_notes:"",                   net:1050, payment:"Zelle/Cash",     flowers:"",                                            notes:"Rima $300 done. Song: Mi Amor Por Ti then Fotografía.",          assigned_staff:[], month:"July" },
  { id:57, title:"Event – Sarah (Dana Point)",      event_type:"Proposal", event_date:"2026-08-02", start_time:"",         location:"Dana Point Compass",                          status:"Upcoming",  deposit_paid:false, balance_due:0,    client:"Sarah",               contact:"",                  amount:0,    expenses:0,   emp_cost:0,   emp_notes:"",                   net:0,    payment:"Zelle/Cash",     flowers:"",                                            notes:"Details TBD.",                                                   assigned_staff:[], month:"August" },
  { id:58, title:"Proposal – Newport Beach Pier",   event_type:"Proposal", event_date:"2026-08-14", start_time:"7:00 PM",  location:"Newport Beach Pier",                         status:"Upcoming",  deposit_paid:true,  balance_due:700,  client:"Unknown",             contact:"",                  amount:1000, expenses:0,   emp_cost:0,   emp_notes:"",                   net:700,  payment:"Zelle/Cash",     flowers:"50 white roses + 'Will You Marry Me' banner + 75 white total. Candles. No table.", notes:"",assigned_staff:[], month:"August" },
  { id:59, title:"Proposal – Gio (Malibu)",         event_type:"Proposal", event_date:"2026-08-20", start_time:"7:20 PM",  location:"Malibu",                                     status:"Upcoming",  deposit_paid:true,  balance_due:950,  client:"Gio",                 contact:"",                  amount:1150, expenses:0,   emp_cost:0,   emp_notes:"",                   net:950,  payment:"Zelle/Cash",     flowers:"No rose bouquet",                             notes:"Photography. Song: Ocean by Karol G.",                          assigned_staff:[], month:"August" },
  { id:60, title:"Pickup – Ada",                    event_type:"Pickup",   event_date:"2026-10-23", start_time:"",         location:"Pickup",                                     status:"Upcoming",  deposit_paid:true,  balance_due:150,  client:"Ada",                 contact:"(562) 565-4699",    amount:200,  expenses:0,   emp_cost:0,   emp_notes:"",                   net:150,  payment:"Zelle/Cash",     flowers:"",                                            notes:"Pickup only.",                                                   assigned_staff:[], month:"October" },
];

// ─── MONTHLY REPORT DATA (from PDF) ──────────────────────────────────────────
const MONTHLY_REPORTS = [
  { month:"January",  events:4,  rentals:0, gross:5870,  emp:540,  other_exp:440, total_exp:980,  net:4890  },
  { month:"February", events:8,  rentals:2, gross:11910, emp:2370, other_exp:715, total_exp:3085, net:8825  },
  { month:"March",    events:9,  rentals:0, gross:10700, emp:910,  other_exp:974, total_exp:1884, net:8816  },
  { month:"April",    events:10, rentals:1, gross:11965, emp:1060, other_exp:905, total_exp:1965, net:9800  },
  { month:"May",      events:12, rentals:0, gross:11680, emp:1300, other_exp:678, total_exp:1978, net:9702  },
  { month:"June",     events:5,  rentals:0, gross:6710,  emp:270,  other_exp:154, total_exp:424,  net:6286  },
];

const MOCK_PACKAGES = [
  { id: 1, name: "Beach Proposal Package", price: 950, category: "Proposal", description: "A magical sunset proposal on the sand — completely handled so you can focus on the moment.", includes: ["Custom floral arch", "Rose petal path", "Champagne setup", "Photographer (1 hr)", "Cleanup"], addons: ["Extra hour photography +$200", "Violinist +$350", "Drone footage +$300"], color: "#F2C4CE", emoji: "🌅" },
  { id: 2, name: "Hotel Room Proposal", price: 1200, category: "Proposal", description: "Transform any hotel suite into a breathtaking romantic scene.", includes: ["Rose petal arrangement", "Balloon ceiling", "Candles & lighting", "Charcuterie board", "Photographer (1 hr)"], addons: ["Champagne tower +$150", "Custom banner +$80", "Live musician +$400"], color: "#F5E6C8", emoji: "🏨" },
  { id: 3, name: "Luxury Engagement Setup", price: 2800, category: "Engagement Party", description: "An elevated engagement party your guests will never forget.", includes: ["Full venue styling", "Floral centerpieces (10 tables)", "Linen & tableware rental", "Lighting design", "Day-of coordinator"], addons: ["Photo booth +$500", "Custom marquee letters +$300", "Dessert table styling +$250"], color: "#E8D5F0", emoji: "💍" },
  { id: 4, name: "Wedding Planning Silver", price: 3500, category: "Wedding", description: "Partial planning support for couples who have a vision and need expert execution.", includes: ["Vendor coordination", "Timeline creation", "Day-of management (12 hrs)", "Ceremony & reception setup", "Emergency kit"], addons: ["Rehearsal dinner coordination +$400", "Brunch-after setup +$350"], color: "#D4EAF7", emoji: "💒" },
  { id: 5, name: "Wedding Planning Gold", price: 6500, category: "Wedding", description: "Full-service planning from engagement to exit — your personal planning team.", includes: ["Full vendor sourcing", "Budget management", "Monthly check-ins", "Full design & décor", "Day-of team (3 coordinators)", "Florals consultation"], addons: ["Engagement party +$1,200", "Custom website +$300", "Videographer sourcing +$200"], color: "#F5E6C8", emoji: "⭐" },
  { id: 6, name: "Wedding Planning Platinum", price: 12000, category: "Wedding", description: "The ultimate all-inclusive luxury experience — no detail too small, no request too grand.", includes: ["Everything in Gold", "Unlimited consultations", "Custom floral design", "Honeymoon planning", "Gift management", "Rehearsal dinner", "Day-after brunch"], addons: ["Destination travel arrangement", "Personal shopping assistance", "Custom wedding website +$0 (included)"], color: "#C9A84C20", emoji: "👑" },
];

const MOCK_CLIENTS = [
  { id:1,  name:"Kylon",                   phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1450, created:"2026-01-16" },
  { id:2,  name:"Armando",                 phone:"(951) 662-0915",  email:"", event_type:"Proposal", status:"Completed", budget:1800, created:"2026-01-18" },
  { id:3,  name:"Manny & Briana",          phone:"714-809-4572",    email:"", event_type:"Proposal", status:"Completed", budget:1460, created:"2026-01-23" },
  { id:4,  name:"Wuillever",               phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1160, created:"2026-01-31" },
  { id:5,  name:"Jorge",                   phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1600, created:"2026-02-07" },
  { id:6,  name:"Pablo & Elizabeth",       phone:"718-501-3436",    email:"", event_type:"Proposal", status:"Completed", budget:1650, created:"2026-02-12" },
  { id:7,  name:"John & Evelyn",           phone:"323-424-9817",    email:"", event_type:"Proposal", status:"Completed", budget:1700, created:"2026-02-14" },
  { id:8,  name:"Sir Ray & Cynthia",       phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:2000, created:"2026-02-14" },
  { id:9,  name:"Tyler & Annie",           phone:"(203) 631-7771",  email:"", event_type:"Proposal", status:"Completed", budget:1400, created:"2026-02-20" },
  { id:10, name:"Eddie (Langham)",         phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1250, created:"2026-02-21" },
  { id:11, name:"Seneca & Tia",            phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1010, created:"2026-02-21" },
  { id:12, name:"Michael (BH)",            phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1510, created:"2026-03-09" },
  { id:13, name:"Nate (Heisler)",          phone:"(626) 499-9197",  email:"", event_type:"Proposal", status:"Completed", budget:1000, created:"2026-03-14" },
  { id:14, name:"Jesse & Gloria",          phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1320, created:"2026-04-06" },
  { id:15, name:"Oscar (Palisades)",       phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1500, created:"2026-04-15" },
  { id:16, name:"Isaiah",                  phone:"(626) 873-4712",  email:"", event_type:"Pickup",   status:"Completed", budget:340,  created:"2026-04-16" },
  { id:17, name:"Vinny & Sylena",          phone:"",                email:"", event_type:"Proposal", status:"Completed", budget:1460, created:"2026-06-19" },
  { id:18, name:"George & Jazmine",        phone:"626-251-3222",    email:"", event_type:"Proposal", status:"Upcoming",  budget:1000, created:"2026-07-18" },
  { id:19, name:"George & Jazmine",        phone:"626-251-3222",    email:"", event_type:"Proposal", status:"Upcoming",  budget:1445, created:"2026-07-18" },
  { id:20, name:"Jerry & Melissa",         phone:"",                email:"", event_type:"Proposal", status:"Upcoming",  budget:1350, created:"2026-07-18" },
  { id:21, name:"Tyler (Jun)",             phone:"",                email:"", event_type:"Proposal", status:"Upcoming",  budget:1250, created:"2026-06-26" },
  { id:22, name:"Gio (Malibu)",            phone:"",                email:"", event_type:"Proposal", status:"Upcoming",  budget:1150, created:"2026-08-20" },
  { id:23, name:"Ada",                     phone:"(562) 565-4699",  email:"", event_type:"Pickup",   status:"Upcoming",  budget:200,  created:"2026-10-23" },
];

const MOCK_MESSAGES = [
  { id: 1, from: "Vinny & Sylena", subject: "Cielo Farms – arrival time question", preview: "Hi Amber! Just wanted to confirm, we need to be there by 6pm right? Also parking?", time: "Today", unread: true, type: "client" },
  { id: 2, from: "Tyler (Jun)", subject: "Flowers for the 26th", preview: "We'd like 25 white rose bouquet confirmed. Is that still available?", time: "Today", unread: true, type: "client" },
  { id: 3, from: "George & Jazmine", subject: "July 18 details", preview: "Can you confirm the apple cider will be included? Also the song selection...", time: "Yesterday", unread: false, type: "client" },
  { id: 4, from: "Rima (Photography)", subject: "Invoice – June events", preview: "Hi Amber, attached is my invoice for the Drew and Enrique events in June...", time: "Yesterday", unread: false, type: "vendor" },
];

const TEMPLATES = [
  { id: 1, name: "Inquiry Response", subject: "Thank you for reaching out – Special Day Planner ✨", body: "Hi [Client Name],\n\nThank you so much for contacting Special Day Planner! We're so excited to hear about your special occasion.\n\nWe'd love to schedule a quick 15-minute call to learn more about your vision. Please click the link below to pick a time that works for you.\n\n[BOOKING LINK]\n\nWe look forward to making your day absolutely magical! 🌸\n\nWith love,\nAmber & the Special Day Planner Team" },
  { id: 2, name: "Deposit Reminder", subject: "Friendly reminder – Your date is almost reserved! 📅", body: "Hi [Client Name],\n\nJust a friendly reminder that your deposit of $[AMOUNT] is due by [DATE] to secure your event date of [EVENT DATE].\n\nYou can pay securely here: [PAYMENT LINK]\n\nDon't let someone else take your date! 💕\n\nAmber" },
  { id: 3, name: "Event Confirmed", subject: "You're officially on the calendar! 🎉", body: "Hi [Client Name],\n\nWonderful news — your event is confirmed! Here's a quick recap:\n\n📅 Date: [EVENT DATE]\n⏰ Time: [START TIME]\n📍 Location: [LOCATION]\n💼 Package: [PACKAGE NAME]\n\nYour next step is [NEXT ACTION]. We'll be in touch soon!\n\nSo excited for you,\nAmber 💐" },
  { id: 4, name: "Balance Due Reminder", subject: "Final balance due – [EVENT DATE] is almost here!", body: "Hi [Client Name],\n\nYour big day is coming up fast! Just a reminder that your remaining balance of $[BALANCE] is due by [DUE DATE].\n\nPay here: [PAYMENT LINK]\n\nWe're so excited to create something beautiful for you! 🌹\n\nAmber" },
];

// Real totals Jan–June from PDF
const STATS = [
  { label: "Events (Jan–Jun 2026)", value: "48",      icon: "📅", trend: "4–12/month",  color: T.mauve   },
  { label: "Gross Revenue (Jan–Jun)", value: "$58,835", icon: "💰", trend: "Jan–Jun 2026", color: T.gold  },
  { label: "Total Net (Jan–Jun)",    value: "$48,319", icon: "✨", trend: "After expenses", color: T.success },
  { label: "Upcoming Events",        value: "8",       icon: "⭐", trend: "Jul–Oct 2026", color: T.warning },
];

// ─── GLOBAL STYLES (injected once) ───────────────────────────────────────────
const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-tap-highlight-color: transparent; }
  html { height: 100%; }
  body { font-family: 'Inter', sans-serif; background: ${T.ivory}; color: ${T.slate}; height: 100%; }
  #root { height: 100%; }
  ::-webkit-scrollbar { width: 3px; height: 3px; }
  ::-webkit-scrollbar-thumb { background: ${T.blush}; border-radius: 3px; }
  input, textarea, select { font-family: 'Inter', sans-serif; font-size: 16px !important; }
  button { cursor: pointer; font-family: 'Inter', sans-serif; -webkit-tap-highlight-color: transparent; }
  .playfair { font-family: 'Playfair Display', serif; }
  .sdp-scroll { overflow-y: auto; -webkit-overflow-scrolling: touch; }
  .sdp-scroll-x { overflow-x: auto; -webkit-overflow-scrolling: touch; }
`;

// ─── UTILITY COMPONENTS ───────────────────────────────────────────────────────
const Badge = ({ status }) => {
  const colors = {
    Confirmed: { bg: "#E8F5EE", color: T.success, border: "#B8DFD0" },
    Pending: { bg: "#FFF3E0", color: T.warning, border: "#FFD9A0" },
    Inquiry: { bg: "#F0EAFF", color: "#7C5CBF", border: "#D4C4F0" },
    Booked: { bg: "#E8F5EE", color: T.success, border: "#B8DFD0" },
    Cancelled: { bg: "#FDEAEA", color: T.danger, border: "#F5C0C0" },
  };
  const s = colors[status] || colors.Pending;
  return (
    <span style={{ background: s.bg, color: s.color, border: `1px solid ${s.border}`, borderRadius: 20, padding: "2px 10px", fontSize: 11, fontWeight: 600, letterSpacing: 0.3 }}>
      {status}
    </span>
  );
};

const Card = ({ children, style = {} }) => (
  <div style={{ background: T.white, borderRadius: 16, border: `1px solid ${T.border}`, padding: 24, ...style }}>
    {children}
  </div>
);

const Btn = ({ children, variant = "primary", onClick, style = {}, small = false }) => {
  const base = { border: "none", borderRadius: 10, fontWeight: 600, cursor: "pointer", transition: "all 0.18s", display: "inline-flex", alignItems: "center", gap: 6, fontSize: small ? 12 : 13, padding: small ? "6px 14px" : "10px 20px" };
  const variants = {
    primary: { background: T.mauve, color: T.white },
    secondary: { background: T.champagne, color: T.slate, border: `1px solid ${T.border}` },
    ghost: { background: "transparent", color: T.mauve, border: `1px solid ${T.mauve}` },
    danger: { background: "#FDEAEA", color: T.danger, border: `1px solid #F5C0C0` },
    gold: { background: T.gold, color: T.white },
  };
  return <button style={{ ...base, ...variants[variant], ...style }} onClick={onClick}>{children}</button>;
};

const Input = ({ label, type = "text", value, onChange, placeholder, required, style = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}{required && <span style={{ color: T.danger }}> *</span>}</label>}
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      style={{ border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, color: T.slate, background: T.ivory, outline: "none", transition: "border-color 0.15s", ...style }}
      onFocus={e => e.target.style.borderColor = T.mauve}
      onBlur={e => e.target.style.borderColor = T.border}
    />
  </div>
);

const Select = ({ label, value, onChange, options, style = {} }) => (
  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
    {label && <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>{label}</label>}
    <select value={value} onChange={onChange} style={{ border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, color: T.slate, background: T.ivory, outline: "none", ...style }}>
      {options.map(o => <option key={o.value || o} value={o.value || o}>{o.label || o}</option>)}
    </select>
  </div>
);

// ─── NAVIGATION ──────────────────────────────────────────────────────────────
const NAV_PRIMARY = [
  { id: "dashboard", label: "Home",     icon: "✦"  },
  { id: "events",    label: "Events",   icon: "🌸"  },
  { id: "calendar",  label: "Calendar", icon: "📅"  },
  { id: "payments",  label: "Payments", icon: "💳"  },
  { id: "booking",   label: "Book",     icon: "➕"  },
];
const NAV_MORE = [
  { id: "clients",  label: "Clients",  icon: "👰"  },
  { id: "packages", label: "Packages", icon: "📦"  },
  { id: "gallery",  label: "Gallery",  icon: "🖼️"  },
  { id: "messages", label: "Messages", icon: "💌", badge: 2 },
  { id: "staff",    label: "Staff",    icon: "👥"  },
  { id: "schema",   label: "DB Schema",icon: "🗄️"  },
];
const NAV_ALL = [...NAV_PRIMARY, ...NAV_MORE];

// Desktop sidebar
const Sidebar = ({ active, onNav, user }) => (
  <div style={{ width: 220, height: "100%", background: T.deepMauve, display: "flex", flexDirection: "column", position: "fixed", left: 0, top: 0, bottom: 0, zIndex: 100, overflowY: "auto" }}>
    <div style={{ padding: "24px 18px 16px", borderBottom: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
      <div style={{ fontSize: 9, fontWeight: 700, color: T.blush, letterSpacing: 3, textTransform: "uppercase", marginBottom: 3 }}>Special Day</div>
      <div className="playfair" style={{ fontSize: 20, color: T.white }}>Planner</div>
      <div style={{ marginTop: 6, width: 28, height: 2, background: T.gold, borderRadius: 1 }} />
    </div>
    <div style={{ padding: "12px 14px", borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
      <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blush}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.deepMauve, flexShrink: 0 }}>{user.name[0]}</div>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: T.white }}>{user.name}</div>
          <div style={{ fontSize: 10, color: T.blush, opacity: 0.8 }}>{user.role}</div>
        </div>
      </div>
    </div>
    <nav style={{ padding: "10px 8px", flex: 1 }}>
      {NAV_ALL.map(item => (
        <button key={item.id} onClick={() => onNav(item.id)} style={{
          width: "100%", display: "flex", alignItems: "center", gap: 9, padding: "9px 10px", borderRadius: 10, border: "none", cursor: "pointer", marginBottom: 1,
          background: active === item.id ? "rgba(242,196,206,0.15)" : "transparent",
          color: active === item.id ? T.blush : "rgba(255,255,255,0.6)",
          fontWeight: active === item.id ? 600 : 400, fontSize: 13,
        }}>
          <span style={{ fontSize: 16 }}>{item.icon}</span>
          {item.label}
          {item.badge && <span style={{ marginLeft: "auto", background: T.gold, color: T.white, borderRadius: 10, fontSize: 10, fontWeight: 700, padding: "1px 6px" }}>{item.badge}</span>}
        </button>
      ))}
    </nav>
    <div style={{ padding: "12px 16px", borderTop: "1px solid rgba(255,255,255,0.08)", flexShrink: 0 }}>
      <div style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", textAlign: "center" }}>Special Day Planner v1.0</div>
    </div>
  </div>
);

// Mobile bottom nav
const BottomNav = ({ active, onNav, onMore }) => (
  <div style={{ position: "fixed", bottom: 0, left: 0, right: 0, background: T.white, borderTop: `1px solid ${T.border}`, display: "flex", zIndex: 200, paddingBottom: "env(safe-area-inset-bottom, 0px)" }}>
    {NAV_PRIMARY.map(item => (
      <button key={item.id} onClick={() => onNav(item.id)} style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
        padding: "10px 4px 8px", border: "none", background: "transparent",
        color: active === item.id ? T.mauve : T.muted, minHeight: 56,
      }}>
        <span style={{ fontSize: 20, lineHeight: 1 }}>{item.icon}</span>
        <span style={{ fontSize: 9, marginTop: 3, fontWeight: active === item.id ? 700 : 400 }}>{item.label}</span>
        {active === item.id && <div style={{ width: 20, height: 2, background: T.mauve, borderRadius: 1, marginTop: 2 }} />}
      </button>
    ))}
    <button onClick={onMore} style={{
      flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      padding: "10px 4px 8px", border: "none", background: "transparent", color: T.muted, minHeight: 56,
    }}>
      <span style={{ fontSize: 20, lineHeight: 1 }}>☰</span>
      <span style={{ fontSize: 9, marginTop: 3 }}>More</span>
    </button>
  </div>
);

// Mobile drawer (slides up from bottom)
const MobileDrawer = ({ active, onNav, onClose, user }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 300 }} onClick={onClose}>
    <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.4)" }} />
    <div onClick={e => e.stopPropagation()} style={{
      position: "absolute", bottom: 0, left: 0, right: 0,
      background: T.white, borderRadius: "20px 20px 0 0",
      padding: "0 0 env(safe-area-inset-bottom, 16px)",
      maxHeight: "75vh", overflowY: "auto",
    }}>
      {/* Handle */}
      <div style={{ display: "flex", justifyContent: "center", padding: "12px 0 4px" }}>
        <div style={{ width: 36, height: 4, background: T.border, borderRadius: 2 }} />
      </div>
      {/* User */}
      <div style={{ padding: "12px 20px 14px", borderBottom: `1px solid ${T.border}`, display: "flex", alignItems: "center", gap: 12 }}>
        <div style={{ width: 40, height: 40, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blush}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: T.deepMauve }}>{user.name[0]}</div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: T.slate }}>{user.name}</div>
          <div style={{ fontSize: 12, color: T.muted }}>{user.role}</div>
        </div>
      </div>
      {/* More nav items */}
      <div style={{ padding: "8px 12px" }}>
        {NAV_MORE.map(item => (
          <button key={item.id} onClick={() => { onNav(item.id); onClose(); }} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 14, padding: "14px 12px",
            borderRadius: 12, border: "none", background: active === item.id ? `${T.blush}30` : "transparent",
            color: active === item.id ? T.mauve : T.slate, fontWeight: active === item.id ? 700 : 400, fontSize: 15,
          }}>
            <span style={{ fontSize: 22, width: 30, textAlign: "center" }}>{item.icon}</span>
            {item.label}
            {item.badge && <span style={{ marginLeft: "auto", background: T.mauve, color: T.white, borderRadius: 10, fontSize: 11, fontWeight: 700, padding: "2px 8px" }}>{item.badge}</span>}
          </button>
        ))}
      </div>
    </div>
  </div>
);

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
const Dashboard = ({ onNav }) => (
  <div>
      <div style={{ marginBottom: 28 }}>
        <div className="playfair" style={{ fontSize: 28, color: T.deepMauve, marginBottom: 4 }}>Good morning, Amber ✨</div>
        <div style={{ color: T.muted, fontSize: 14 }}>48 events completed Jan–Jun 2026 · $48,319 net · 8 upcoming booked</div>
      </div>

    {/* Stats — 2 col mobile, 4 col desktop */}
    <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 10, marginBottom: 20 }}>
      {STATS.map((s, i) => (
        <Card key={i} style={{ padding: "16px 14px" }}>
          <div style={{ fontSize: 18, marginBottom: 6 }}>{s.icon}</div>
          <div style={{ fontSize: 20, fontWeight: 700, color: s.color, marginBottom: 2 }}>{s.value}</div>
          <div style={{ fontSize: 11, color: T.muted, marginBottom: 4 }}>{s.label}</div>
          <div style={{ fontSize: 10, color: T.success, fontWeight: 600 }}>{s.trend}</div>
        </Card>
      ))}
    </div>

    <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 14 }}>
      {/* Upcoming Events */}
      <Card>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
          <div className="playfair" style={{ fontSize: 18, color: T.deepMauve }}>Upcoming Events</div>
          <Btn variant="ghost" small onClick={() => onNav("events")}>View All</Btn>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {MOCK_EVENTS.filter(e => e.status === "Upcoming" || e.event_date >= "2026-06-19").slice(0, 5).map(ev => (
            <div key={ev.id} style={{ display: "flex", alignItems: "center", gap: 14, padding: "12px 14px", background: T.ivory, borderRadius: 12, border: `1px solid ${T.border}` }}>
              <div style={{ width: 46, height: 46, borderRadius: 10, background: `linear-gradient(135deg, ${T.blush}, ${T.champagne})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.mauve }}>{new Date(ev.event_date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}</div>
                <div style={{ fontSize: 16, fontWeight: 700, color: T.deepMauve }}>{new Date(ev.event_date).getDate()}</div>
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: T.slate, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: T.muted, marginTop: 2 }}>{ev.start_time || "TBD"} · {ev.location}</div>
                {ev.flowers && <div style={{ fontSize: 10, color: T.mauve, marginTop: 1 }}>🌸 {ev.flowers}</div>}
              </div>
              <Badge status={ev.status} />
            </div>
          ))}
        </div>
      </Card>

      {/* Revenue Breakdown */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <Card>
          <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 14 }}>Revenue by Package</div>
          {MONTHLY_REPORTS.map(r => {
            const maxGross = 11910;
            return (
              <div key={r.month} style={{ marginBottom: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 4 }}>
                  <span style={{ color: T.slate, fontWeight: 600 }}>{r.month}</span>
                  <span style={{ color: T.muted }}><span style={{ color: T.success, fontWeight: 600 }}>${r.net.toLocaleString()}</span> net</span>
                </div>
                <div style={{ height: 7, background: T.border, borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(r.gross / maxGross) * 100}%`, height: "100%", background: `linear-gradient(90deg, ${T.mauve}, ${T.blush})`, borderRadius: 4 }} />
                </div>
              </div>
            );
          })}
          <div style={{ marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}`, display:"flex", justifyContent:"space-between", fontSize:12 }}>
            <span style={{ color: T.muted }}>6-Month Total Net</span>
            <span style={{ fontWeight: 700, color: T.gold }}>$48,319</span>
          </div>
        </Card>
        <Card style={{ padding: "18px 22px" }}>
          <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 12 }}>Quick Actions</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            <Btn variant="primary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onNav("booking")}>➕ New Booking</Btn>
            <Btn variant="secondary" style={{ width: "100%", justifyContent: "center" }} onClick={() => onNav("clients")}>👰 Add Client</Btn>
            <Btn variant="ghost" style={{ width: "100%", justifyContent: "center" }} onClick={() => onNav("messages")}>💌 Send Template</Btn>
          </div>
        </Card>
      </div>
    </div>

    {/* Unread Messages */}
    <Card>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="playfair" style={{ fontSize: 18, color: T.deepMauve }}>Recent Messages</div>
        <Btn variant="ghost" small onClick={() => onNav("messages")}>View All</Btn>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {MOCK_MESSAGES.map(m => (
          <div key={m.id} style={{ display: "flex", gap: 14, padding: "12px 14px", background: m.unread ? `${T.blush}20` : T.ivory, borderRadius: 12, border: `1px solid ${m.unread ? T.blush : T.border}`, alignItems: "flex-start" }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: T.champagne, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: T.mauve, flexShrink: 0 }}>
              {m.from[0]}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                <div style={{ fontSize: 13, fontWeight: m.unread ? 700 : 500, color: T.slate }}>{m.from}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{m.time}</div>
              </div>
              <div style={{ fontSize: 12, color: T.slate, fontWeight: 500, marginBottom: 2 }}>{m.subject}</div>
              <div style={{ fontSize: 12, color: T.muted }}>{m.preview}</div>
            </div>
            {m.unread && <div style={{ width: 8, height: 8, borderRadius: "50%", background: T.mauve, flexShrink: 0, marginTop: 4 }} />}
          </div>
        ))}
      </div>
    </Card>
  </div>
);

// ─── CALENDAR ─────────────────────────────────────────────────────────────────
// ─── EVENT DETAIL SHEET (shared by calendar tap) ────────────────────────────
const EventDetailSheet = ({ event, onClose }) => {
  if (!event) return null;
  const rows = [
    ["⏰", "Time",      event.start_time || "—"],
    ["📍", "Location",  event.location   || "—"],
    ["👤", "Client",    event.client],
    ["📞", "Contact",   event.contact    || "—"],
    ["💰", "Amount",    event.amount ? `$${event.amount.toLocaleString()}` : "—"],
    ["💳", "Balance",   event.balance_due > 0 ? `$${event.balance_due.toLocaleString()} due` : "✅ Settled"],
    ["🌸", "Flowers",   event.flowers    || "—"],
    ["💵", "Payment",   event.payment    || "—"],
    ["👥", "Staff pay", event.emp_notes  || "—"],
  ];
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 400 }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
      <div onClick={e => e.stopPropagation()} style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: T.white, borderRadius: "22px 22px 0 0",
        paddingBottom: "env(safe-area-inset-bottom, 20px)",
        maxHeight: "82vh", display: "flex", flexDirection: "column",
      }}>
        {/* Handle + header */}
        <div style={{ padding: "10px 20px 0", flexShrink: 0 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 10 }}>
            <div style={{ width: 36, height: 4, background: T.border, borderRadius: 2 }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", paddingBottom: 14, borderBottom: `1px solid ${T.border}`, marginBottom: 4 }}>
            <div style={{ flex: 1, paddingRight: 12 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>
                {new Date(event.event_date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
              </div>
              <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, lineHeight: 1.3, marginBottom: 8 }}>{event.title}</div>
              <Badge status={event.status} />
            </div>
            <button onClick={onClose} style={{ border: "none", background: T.ivory, borderRadius: "50%", width: 32, height: 32, fontSize: 16, color: T.muted, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
        </div>
        {/* Scrollable detail rows */}
        <div style={{ overflowY: "auto", WebkitOverflowScrolling: "touch", padding: "8px 20px 12px", flex: 1 }}>
          {rows.map(([icon, label, value]) => (
            <div key={label} style={{ display: "flex", gap: 12, paddingTop: 12, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 18, width: 24, textAlign: "center", flexShrink: 0 }}>{icon}</span>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 2 }}>{label}</div>
                <div style={{ fontSize: 14, color: T.slate, wordBreak: "break-word" }}>{value}</div>
              </div>
            </div>
          ))}
          {event.notes ? (
            <div style={{ display: "flex", gap: 12, paddingTop: 12, paddingBottom: 12, borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 18, width: 24, textAlign: "center", flexShrink: 0 }}>📝</span>
              <div>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 2 }}>Notes</div>
                <div style={{ fontSize: 14, color: T.slate }}>{event.notes}</div>
              </div>
            </div>
          ) : null}
          {event.assigned_staff?.length > 0 && (
            <div style={{ paddingTop: 14 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Assigned Staff</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {event.assigned_staff.map(s => (
                  <span key={s} style={{ background: T.champagne, color: T.mauve, borderRadius: 20, padding: "5px 12px", fontSize: 13, fontWeight: 600 }}>{s}</span>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
            <Btn variant="primary" style={{ flex: 1, justifyContent: "center" }}>Edit Event</Btn>
            <Btn variant="secondary" style={{ flex: 1, justifyContent: "center" }}>Send Update</Btn>
          </div>
        </div>
      </div>
    </div>
  );
};

const CalendarView = () => {
  const [month, setMonth] = useState(new Date(2026, 0, 1));
  const [selectedDate, setSelectedDate] = useState(null);
  const [sheetEvent, setSheetEvent] = useState(null);

  const year = month.getFullYear();
  const monthIdx = month.getMonth();
  const firstDay = new Date(year, monthIdx, 1).getDay();
  const daysInMonth = new Date(year, monthIdx + 1, 0).getDate();
  const monthName = month.toLocaleDateString("en-US", { month: "long", year: "numeric" });

  const eventsByDate = {};
  MOCK_EVENTS.forEach(ev => {
    if (!eventsByDate[ev.event_date]) eventsByDate[ev.event_date] = [];
    eventsByDate[ev.event_date].push(ev);
  });

  const typeColor = {
    Proposal: T.mauve, Rental: T.gold, Photoshoot: "#7C5CBF",
    Pickup: T.muted, Delivery: T.success, Inquiry: T.warning,
  };

  const monthKey = `${year}-${String(monthIdx + 1).padStart(2, "0")}`;
  const monthEvents = MOCK_EVENTS.filter(e => e.event_date.startsWith(monthKey))
    .sort((a, b) => a.event_date.localeCompare(b.event_date));

  const handleDayTap = (dateStr) => {
    const evs = eventsByDate[dateStr];
    if (!evs?.length) return;
    setSelectedDate(dateStr);
    // if multiple events on same day, show first; user can scroll list
    setSheetEvent(evs[0]);
  };

  return (
    <div>
      {/* Month header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <div className="playfair" style={{ fontSize: 22, color: T.deepMauve }}>Calendar</div>
        <div style={{ display: "flex", gap: 6 }}>
          <button onClick={() => { setMonth(new Date(year, monthIdx - 1, 1)); setSelectedDate(null); }}
            style={{ border: "none", background: T.champagne, borderRadius: 10, padding: "8px 16px", cursor: "pointer", color: T.mauve, fontWeight: 700, fontSize: 18, minHeight: 44 }}>‹</button>
          <button onClick={() => { setMonth(new Date(year, monthIdx + 1, 1)); setSelectedDate(null); }}
            style={{ border: "none", background: T.champagne, borderRadius: 10, padding: "8px 16px", cursor: "pointer", color: T.mauve, fontWeight: 700, fontSize: 18, minHeight: 44 }}>›</button>
        </div>
      </div>
      <div style={{ textAlign: "center", marginBottom: 14 }}>
        <span className="playfair" style={{ fontSize: 18, color: T.deepMauve }}>{monthName}</span>
        <span style={{ marginLeft: 10, fontSize: 12, color: T.muted, background: T.champagne, borderRadius: 12, padding: "2px 10px" }}>{monthEvents.length} events</span>
      </div>

      {/* Calendar grid */}
      <Card style={{ padding: "14px 10px" }}>
        {/* Day labels — single letter on mobile */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", marginBottom: 6 }}>
          {["S","M","T","W","T","F","S"].map((d, i) => (
            <div key={i} style={{ textAlign: "center", fontSize: 11, fontWeight: 700, color: T.muted, padding: "4px 0" }}>{d}</div>
          ))}
        </div>

        {/* Day cells — compact, dot-based */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 3 }}>
          {Array.from({ length: firstDay }).map((_, i) => <div key={`e${i}`} />)}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dateStr = `${year}-${String(monthIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
            const dayEvs = eventsByDate[dateStr] || [];
            const isSelected = selectedDate === dateStr;
            const hasEvents = dayEvs.length > 0;
            return (
              <div key={day} onClick={() => handleDayTap(dateStr)} style={{
                display: "flex", flexDirection: "column", alignItems: "center",
                padding: "6px 2px", borderRadius: 10, cursor: hasEvents ? "pointer" : "default",
                background: isSelected ? T.mauve : hasEvents ? `${T.blush}30` : "transparent",
                minHeight: 52, transition: "background 0.15s",
              }}>
                <div style={{
                  fontSize: 14, fontWeight: hasEvents ? 700 : 400, lineHeight: 1,
                  color: isSelected ? T.white : hasEvents ? T.deepMauve : T.muted,
                  marginBottom: 5,
                }}>{day}</div>
                {/* Up to 3 colored dots */}
                <div style={{ display: "flex", gap: 2, flexWrap: "wrap", justifyContent: "center" }}>
                  {dayEvs.slice(0, 3).map((ev, di) => (
                    <div key={di} style={{
                      width: 6, height: 6, borderRadius: "50%",
                      background: isSelected ? "rgba(255,255,255,0.7)" : (typeColor[ev.event_type] || T.blush),
                    }} />
                  ))}
                </div>
                {dayEvs.length > 3 && (
                  <div style={{ fontSize: 8, color: isSelected ? "rgba(255,255,255,0.7)" : T.muted, marginTop: 2 }}>+{dayEvs.length - 3}</div>
                )}
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10, marginTop: 14, paddingTop: 12, borderTop: `1px solid ${T.border}` }}>
          {Object.entries(typeColor).filter(([, c]) => c !== T.muted).map(([type, color]) => (
            <div key={type} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 10, color: T.muted }}>
              <div style={{ width: 8, height: 8, borderRadius: "50%", background: color }} />
              {type}
            </div>
          ))}
        </div>
      </Card>

      {/* Month event list — tap any row to open sheet */}
      <div style={{ marginTop: 16 }}>
        <div className="playfair" style={{ fontSize: 16, color: T.deepMauve, marginBottom: 10 }}>
          {monthName} — All Events
        </div>
        {monthEvents.length === 0 && (
          <Card style={{ textAlign: "center", padding: "32px 20px" }}>
            <div style={{ fontSize: 28, marginBottom: 8 }}>📅</div>
            <div style={{ fontSize: 14, color: T.muted }}>No events this month</div>
          </Card>
        )}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {monthEvents.map(ev => (
            <div key={ev.id} onClick={() => setSheetEvent(ev)}
              style={{ background: T.white, borderRadius: 14, border: `1px solid ${T.border}`, padding: "14px 16px", display: "flex", gap: 14, alignItems: "center", cursor: "pointer" }}>
              {/* Date badge */}
              <div style={{ width: 44, height: 44, borderRadius: 12, background: `linear-gradient(135deg, ${T.blush}, ${T.champagne})`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <div style={{ fontSize: 10, fontWeight: 700, color: T.mauve, lineHeight: 1 }}>
                  {new Date(ev.event_date).toLocaleDateString("en-US", { month: "short" }).toUpperCase()}
                </div>
                <div style={{ fontSize: 18, fontWeight: 800, color: T.deepMauve, lineHeight: 1 }}>
                  {new Date(ev.event_date).getDate()}
                </div>
              </div>
              {/* Info */}
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13, fontWeight: 700, color: T.slate, marginBottom: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{ev.title}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{ev.start_time || "—"} · {ev.location}</div>
                {ev.flowers && <div style={{ fontSize: 11, color: T.mauve, marginTop: 2 }}>🌸 {ev.flowers}</div>}
              </div>
              {/* Right side */}
              <div style={{ flexShrink: 0, textAlign: "right" }}>
                {ev.amount > 0 && <div style={{ fontSize: 13, fontWeight: 700, color: T.deepMauve }}>${ev.amount.toLocaleString()}</div>}
                <div style={{ marginTop: 4 }}><Badge status={ev.status} /></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Event detail bottom sheet */}
      {sheetEvent && <EventDetailSheet event={sheetEvent} onClose={() => setSheetEvent(null)} />}
    </div>
  );
};

// ─── EVENTS LIST ─────────────────────────────────────────────────────────────
const EventsList = () => {
  const [filter, setFilter] = useState("All");
  const types = ["All", "Proposal", "Engagement Party", "Wedding"];
  const filtered = filter === "All" ? MOCK_EVENTS : MOCK_EVENTS.filter(e => e.event_type === filter);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="playfair" style={{ fontSize: 26, color: T.deepMauve }}>All Events</div>
        <Btn variant="primary">➕ New Event</Btn>
      </div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {types.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{ border: `1px solid ${filter === t ? T.mauve : T.border}`, background: filter === t ? T.mauve : T.white, color: filter === t ? T.white : T.muted, borderRadius: 20, padding: "6px 16px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {t}
          </button>
        ))}
      </div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: 16, border: `1px solid ${T.border}`, background: T.white }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
          <thead>
            <tr style={{ background: T.ivory, borderBottom: `1px solid ${T.border}` }}>
              {["Event", "Type", "Date & Time", "Location", "Flowers / Notes", "Staff Pay", "Amount", "Net", "Status"].map(h => (
                <th key={h} style={{ padding: "12px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.map((ev, i) => (
              <tr key={ev.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? T.white : `${T.ivory}80` }}>
                <td style={{ padding: "14px 16px" }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: T.slate }}>{ev.title}</div>
                  <div style={{ fontSize: 11, color: T.muted }}>{ev.client}</div>
                </td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: T.muted }}>{ev.event_type}</td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: T.slate, fontWeight: 500 }}>
                  {new Date(ev.event_date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  {ev.start_time && <div style={{ fontSize: 11, color: T.muted }}>{ev.start_time}</div>}
                </td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: T.muted, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.location}</td>
                <td style={{ padding: "14px 16px", fontSize: 11, color: T.muted, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{ev.flowers || ev.notes?.slice(0,40) || "—"}</td>
                <td style={{ padding: "14px 16px", fontSize: 12, color: T.muted }}>{ev.emp_notes || "—"}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 700, color: T.deepMauve }}>{ev.amount > 0 ? `$${ev.amount.toLocaleString()}` : "—"}</td>
                <td style={{ padding: "14px 16px", fontSize: 13, fontWeight: 600, color: ev.net > 0 ? T.success : T.muted }}>{ev.net > 0 ? `$${ev.net.toLocaleString()}` : "—"}</td>
                <td style={{ padding: "14px 16px" }}><Badge status={ev.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── CLIENTS ──────────────────────────────────────────────────────────────────
const ClientsView = () => (
  <div>
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
      <div className="playfair" style={{ fontSize: 26, color: T.deepMauve }}>Clients</div>
      <Btn variant="primary">➕ Add Client</Btn>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
      {MOCK_CLIENTS.map(c => (
        <Card key={c.id} style={{ padding: 20 }}>
          <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 14, paddingBottom: 14, borderBottom: `1px solid ${T.border}` }}>
            <div style={{ width: 44, height: 44, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blush}, ${T.champagne})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, fontWeight: 700, color: T.deepMauve, flexShrink: 0 }}>
              {c.name[0]}
            </div>
            <div>
              <div style={{ fontSize: 14, fontWeight: 700, color: T.slate }}>{c.name}</div>
              <Badge status={c.status} />
            </div>
          </div>
          {[["📧", c.email], ["📞", c.phone], ["🎉", c.event_type], ["💰", `Budget: $${c.budget.toLocaleString()}`]].map(([icon, val]) => (
            <div key={val} style={{ display: "flex", gap: 8, fontSize: 12, color: T.muted, marginBottom: 6 }}>
              <span>{icon}</span> {val}
            </div>
          ))}
          <div style={{ marginTop: 12, display: "flex", gap: 6 }}>
            <Btn variant="ghost" small>View</Btn>
            <Btn variant="secondary" small>Message</Btn>
          </div>
        </Card>
      ))}
    </div>
  </div>
);

// ─── PACKAGES ─────────────────────────────────────────────────────────────────
const PackagesView = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="playfair" style={{ fontSize: 26, color: T.deepMauve }}>Packages</div>
        <Btn variant="primary">➕ New Package</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
        {MOCK_PACKAGES.map(pkg => (
          <Card key={pkg.id} style={{ padding: 0, overflow: "hidden", cursor: "pointer", transition: "transform 0.15s, box-shadow 0.15s", border: selected === pkg.id ? `2px solid ${T.mauve}` : `1px solid ${T.border}` }} onClick={() => setSelected(selected === pkg.id ? null : pkg.id)}>
            {/* Header */}
            <div style={{ background: `linear-gradient(135deg, ${pkg.color}, ${T.champagne})`, padding: "28px 22px 20px", position: "relative" }}>
              <div style={{ fontSize: 30, marginBottom: 8 }}>{pkg.emoji}</div>
              <div style={{ fontSize: 10, fontWeight: 700, color: T.muted, letterSpacing: 1, textTransform: "uppercase", marginBottom: 4 }}>{pkg.category}</div>
              <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, lineHeight: 1.2 }}>{pkg.name}</div>
              <div style={{ position: "absolute", top: 18, right: 18, fontSize: 20, fontWeight: 700, color: T.deepMauve }}>${pkg.price.toLocaleString()}</div>
            </div>
            {/* Body */}
            <div style={{ padding: "18px 22px" }}>
              <div style={{ fontSize: 12, color: T.muted, lineHeight: 1.6, marginBottom: 14 }}>{pkg.description}</div>
              {selected === pkg.id && (
                <>
                  <div style={{ fontSize: 11, fontWeight: 700, color: T.mauve, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>What's Included</div>
                  {pkg.includes.map(item => (
                    <div key={item} style={{ display: "flex", gap: 8, fontSize: 12, color: T.slate, marginBottom: 5 }}>
                      <span style={{ color: T.success }}>✓</span> {item}
                    </div>
                  ))}
                  <div style={{ marginTop: 14, paddingTop: 14, borderTop: `1px solid ${T.border}` }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: T.gold, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Add-Ons Available</div>
                    {pkg.addons.map(a => (
                      <div key={a} style={{ fontSize: 12, color: T.muted, marginBottom: 4 }}>+ {a}</div>
                    ))}
                  </div>
                  <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                    <Btn variant="primary" small>Edit Package</Btn>
                    <Btn variant="danger" small>Delete</Btn>
                  </div>
                </>
              )}
              {selected !== pkg.id && (
                <div style={{ fontSize: 11, color: T.mauve, fontWeight: 600 }}>Click to expand details ▾</div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

// ─── BOOKING FORM ─────────────────────────────────────────────────────────────
const BookingForm = () => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", event_type: "Proposal", event_date: "", budget: "", location: "", package: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);

  const field = (key) => ({ value: form[key], onChange: e => setForm(f => ({ ...f, [key]: e.target.value })) });

  if (submitted) return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", minHeight: 400 }}>
      <Card style={{ textAlign: "center", padding: "60px 40px", maxWidth: 480 }}>
        <div style={{ fontSize: 52, marginBottom: 16 }}>🎉</div>
        <div className="playfair" style={{ fontSize: 26, color: T.deepMauve, marginBottom: 8 }}>Booking Submitted!</div>
        <div style={{ color: T.muted, fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
          The booking for <strong>{form.name}</strong> has been recorded. An automatic confirmation email will be sent to {form.email}.
        </div>
        <Btn variant="primary" onClick={() => { setSubmitted(false); setForm({ name: "", phone: "", email: "", event_type: "Proposal", event_date: "", budget: "", location: "", package: "", notes: "" }); }}>+ Add Another Booking</Btn>
      </Card>
    </div>
  );

  return (
    <div>
      <div className="playfair" style={{ fontSize: 26, color: T.deepMauve, marginBottom: 6 }}>New Client Booking</div>
      <div style={{ color: T.muted, fontSize: 14, marginBottom: 24 }}>Fill in the client details to create a new booking record.</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <Card>
            <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 16 }}>Client Information</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              <Input label="Full Name" placeholder="Sofia Martinez" required {...field("name")} />
              <Input label="Phone" type="tel" placeholder="(310) 555-0100" required {...field("phone")} />
              <Input label="Email" type="email" placeholder="sofia@email.com" required {...field("email")} />
              <Input label="Budget" type="number" placeholder="1000" {...field("budget")} />
            </div>
          </Card>

          <Card>
            <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 16 }}>Event Details</div>
<div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12 }}>
              <Select label="Event Type" {...field("event_type")} options={["Proposal", "Engagement Party", "Wedding", "Vow Renewal", "Other"]} />
              <Input label="Event Date" type="date" required {...field("event_date")} />
            </div>
            <div style={{ marginTop: 14 }}>
              <Input label="Location / Venue" placeholder="Malibu Beach, CA" {...field("location")} />
            </div>
            <div style={{ marginTop: 14 }}>
              <Select label="Package" {...field("package")} options={[{ value: "", label: "Select a package..." }, ...MOCK_PACKAGES.map(p => ({ value: p.name, label: `${p.name} – $${p.price.toLocaleString()}` }))]} />
            </div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>Notes / Special Requests</label>
              <textarea rows={4} value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} placeholder="Any special details, preferences, or ideas the client mentioned..." style={{ border: `1px solid ${T.border}`, borderRadius: 10, padding: "10px 14px", fontSize: 14, color: T.slate, background: T.ivory, resize: "vertical", outline: "none", fontFamily: "Inter, sans-serif" }} />
            </div>
          </Card>

          <Card>
            <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 12 }}>Inspiration Photos</div>
            <div style={{ border: `2px dashed ${T.border}`, borderRadius: 14, padding: "32px 20px", textAlign: "center", background: T.ivory }}>
              <div style={{ fontSize: 28, marginBottom: 8 }}>📸</div>
              <div style={{ fontSize: 14, color: T.muted, marginBottom: 8 }}>Drag & drop photos or click to upload</div>
              <div style={{ fontSize: 11, color: T.border, marginBottom: 12 }}>PNG, JPG up to 10MB each · Stored in Supabase Storage</div>
              <Btn variant="secondary" small>Choose Files</Btn>
            </div>
          </Card>

          <Btn variant="primary" style={{ padding: "14px 28px", fontSize: 15, justifyContent: "center" }} onClick={() => form.name && form.email && setSubmitted(true)}>
            ✨ Create Booking
          </Btn>
        </div>

        {/* Preview Panel */}
        <div>
          <Card style={{ position: "sticky", top: 20 }}>
            <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 16 }}>Booking Preview</div>
            {form.name ? (
              <>
                <div style={{ width: 54, height: 54, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blush}, ${T.champagne})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: T.deepMauve, marginBottom: 12 }}>{form.name[0]}</div>
                <div style={{ fontSize: 17, fontWeight: 700, color: T.slate, marginBottom: 4 }}>{form.name}</div>
                <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>{form.email}</div>
              </>
            ) : (
              <div style={{ color: T.muted, fontSize: 13, marginBottom: 16 }}>Start filling in the form to see a preview…</div>
            )}
            {[
              ["Event Type", form.event_type],
              ["Date", form.event_date || "—"],
              ["Location", form.location || "—"],
              ["Package", form.package || "—"],
              ["Budget", form.budget ? `$${Number(form.budget).toLocaleString()}` : "—"],
            ].map(([label, val]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "9px 0", borderBottom: `1px solid ${T.border}`, fontSize: 13 }}>
                <span style={{ color: T.muted }}>{label}</span>
                <span style={{ color: T.slate, fontWeight: 500 }}>{val}</span>
              </div>
            ))}
            {form.package && (
              <div style={{ marginTop: 16, padding: "14px", background: `${T.blush}30`, borderRadius: 10 }}>
                <div style={{ fontSize: 11, fontWeight: 700, color: T.mauve, marginBottom: 4 }}>SELECTED PACKAGE</div>
                {(() => { const pkg = MOCK_PACKAGES.find(p => p.name === form.package); return pkg ? (
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: T.deepMauve }}>{pkg.name}</div>
                    <div style={{ fontSize: 18, fontWeight: 700, color: T.mauve, marginTop: 2 }}>${pkg.price.toLocaleString()}</div>
                  </div>
                ) : null; })()}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

// ─── PAYMENTS ─────────────────────────────────────────────────────────────────
const PaymentsView = () => {
  const payments = [
    { id:1,  client:"Kylon",              event:"Proposal – Norco Jan 16",     type:"Full Payment", amount:1450, net:1240,  status:"Paid",   date:"2026-01-16", method:"CashApp"     },
    { id:2,  client:"Armando",            event:"Proposal – Wilshire Jan 18",  type:"Full Payment", amount:1800, net:1600,  status:"Paid",   date:"2026-01-18", method:"Zelle"       },
    { id:3,  client:"Manny & Briana",     event:"Proposal – Dana Point",       type:"Full Payment", amount:1460, net:1135,  status:"Paid",   date:"2026-01-23", method:"Zelle/Cash"  },
    { id:4,  client:"Wuillever",          event:"Proposal – San Pedro",        type:"Full Payment", amount:1160, net:915,   status:"Paid",   date:"2026-01-31", method:"Zelle"       },
    { id:5,  client:"Jorge",              event:"Proposal – San Pedro Feb 7",  type:"Full Payment", amount:1600, net:1160,  status:"Paid",   date:"2026-02-07", method:"Zelle/Cash"  },
    { id:6,  client:"Pablo & Elizabeth",  event:"Proposal – Norco Feb 12",     type:"Full Payment", amount:1650, net:1520,  status:"Paid",   date:"2026-02-12", method:"Zelle/Cash"  },
    { id:7,  client:"John & Evelyn",      event:"Proposal – Dana Point Feb 14",type:"Full Payment", amount:1700, net:1340,  status:"Paid",   date:"2026-02-14", method:"Zelle/Cash"  },
    { id:8,  client:"Sir Ray & Cynthia",  event:"Proposal – Wilshire Feb 14",  type:"Full Payment", amount:2000, net:1620,  status:"Paid",   date:"2026-02-14", method:"Zelle"       },
    { id:9,  client:"Tyler & Annie",      event:"Proposal – DTLA",             type:"Full Payment", amount:1400, net:995,   status:"Paid",   date:"2026-02-20", method:"Zelle"       },
    { id:10, client:"Michael",            event:"Proposal – Beverly Hills",     type:"Full Payment", amount:1510, net:1226,  status:"Paid",   date:"2026-03-09", method:"Zelle"       },
    { id:11, client:"Jesse & Gloria",     event:"Proposal – Doris Walker",     type:"Full Payment", amount:1320, net:1055,  status:"Paid",   date:"2026-04-06", method:"Zelle/Cash"  },
    { id:12, client:"CRAM / Caesar",      event:"Proposal – Lake Elsinore",    type:"Full Payment", amount:1580, net:1208,  status:"Paid",   date:"2026-04-26", method:"Zelle/Cash"  },
    { id:13, client:"Drew",               event:"Proposal – Norco Jun 6",      type:"Full Payment", amount:1560, net:1226,  status:"Paid",   date:"2026-06-06", method:"Apple Cash"  },
    { id:14, client:"Vinny & Sylena",     event:"Proposal – Cielo Farms",      type:"Deposit",      amount:300,  net:0,     status:"Paid",   date:"2026-06-19", method:"Zelle"       },
    { id:15, client:"Enrique (Jun)",      event:"Proposal – San Pedro Jun 20", type:"Deposit",      amount:50,   net:0,     status:"Paid",   date:"2026-06-20", method:"Zelle"       },
    { id:16, client:"Enrique (Jun)",      event:"Proposal – San Pedro Jun 20", type:"Balance",      amount:1300, net:0,     status:"Unpaid", date:"Due after event", method:"—"     },
    { id:17, client:"Tyler (Jun)",        event:"Proposal – San Pedro Jun 26", type:"Deposit",      amount:200,  net:0,     status:"Paid",   date:"2026-06-26", method:"Zelle"       },
    { id:18, client:"Tyler (Jun)",        event:"Proposal – San Pedro Jun 26", type:"Balance",      amount:1050, net:0,     status:"Unpaid", date:"Due after event", method:"—"     },
    { id:19, client:"George & Jazmine",   event:"Proposal – Riverside Jul 18", type:"Deposit",      amount:300,  net:0,     status:"Paid",   date:"2026-07-18", method:"Zelle"       },
    { id:20, client:"George & Jazmine",   event:"Proposal – Riverside Jul 18", type:"Balance",      amount:700,  net:0,     status:"Unpaid", date:"Due Jul 18",  method:"—"          },
    { id:21, client:"Tyler (Jul)",        event:"Proposal – Norco Jul 18",     type:"Deposit",      amount:600,  net:0,     status:"Paid",   date:"2026-07-18", method:"Zelle"       },
    { id:22, client:"Tyler (Jul)",        event:"Proposal – Norco Jul 18",     type:"Balance",      amount:1000, net:0,     status:"Unpaid", date:"Due Jul 18",  method:"—"          },
    { id:23, client:"Jerry & Melissa",    event:"Proposal – Norco Jul 18",     type:"Deposit",      amount:300,  net:0,     status:"Paid",   date:"2026-07-18", method:"Zelle"       },
    { id:24, client:"Jerry & Melissa",    event:"Proposal – Norco Jul 18",     type:"Balance",      amount:1050, net:0,     status:"Unpaid", date:"Due Jul 18",  method:"—"          },
    { id:25, client:"Unknown (Aug 14)",   event:"Proposal – Newport Pier",     type:"Deposit",      amount:300,  net:0,     status:"Paid",   date:"2026-08-14", method:"Zelle"       },
    { id:26, client:"Unknown (Aug 14)",   event:"Proposal – Newport Pier",     type:"Balance",      amount:700,  net:0,     status:"Unpaid", date:"Due Aug 14",  method:"—"          },
    { id:27, client:"Gio",                event:"Proposal – Malibu",           type:"Deposit",      amount:200,  net:0,     status:"Paid",   date:"2026-08-20", method:"Zelle"       },
    { id:28, client:"Gio",                event:"Proposal – Malibu",           type:"Balance",      amount:950,  net:0,     status:"Unpaid", date:"Due Aug 20",  method:"—"          },
  ];
  const totalPaid   = payments.filter(p => p.status === "Paid").reduce((s,p) => s + p.amount, 0);
  const totalUnpaid = payments.filter(p => p.status === "Unpaid").reduce((s,p) => s + p.amount, 0);
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? payments : payments.filter(p => p.status === filter);

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="playfair" style={{ fontSize: 26, color: T.deepMauve }}>Payments</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="ghost">📄 Export CSV</Btn>
          <Btn variant="gold">💳 Request Payment</Btn>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: 12, marginBottom: 18 }}>
        <Card style={{ background: `linear-gradient(135deg, ${T.mauve}, ${T.deepMauve})`, border: "none" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.6)", marginBottom: 4, fontWeight: 600 }}>Paid (Jan–Jun + Deposits)</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: T.white }}>${totalPaid.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: T.blush, marginTop: 4 }}>{payments.filter(p=>p.status==="Paid").length} transactions</div>
        </Card>
        <Card style={{ background: `linear-gradient(135deg, #E8A020, #C97810)`, border: "none" }}>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", marginBottom: 4, fontWeight: 600 }}>Outstanding Balances</div>
          <div style={{ fontSize: 28, fontWeight: 700, color: T.white }}>${totalUnpaid.toLocaleString()}</div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", marginTop: 4 }}>{payments.filter(p=>p.status==="Unpaid").length} open invoices</div>
        </Card>
        <Card>
          <div style={{ fontSize: 12, color: T.muted, marginBottom: 4, fontWeight: 600 }}>Payment Methods Used</div>
          {[["Zelle","Most common"],["Apple/Google Pay","Occasional"],["Cash","Accepted"],["CashApp","Accepted"]].map(([m,d])=>(
            <div key={m} style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:T.slate, marginBottom:4 }}>
              <span style={{fontWeight:600}}>{m}</span><span style={{color:T.muted}}>{d}</span>
            </div>
          ))}
        </Card>
      </div>

      <div style={{ display:"flex", gap:8, marginBottom:16 }}>
        {["All","Paid","Unpaid"].map(f=>(
          <button key={f} onClick={()=>setFilter(f)} style={{ border:`1px solid ${filter===f?T.mauve:T.border}`, background:filter===f?T.mauve:T.white, color:filter===f?T.white:T.muted, borderRadius:20, padding:"6px 16px", fontSize:12, fontWeight:600, cursor:"pointer" }}>{f}</button>
        ))}
      </div>

      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: 16, border: `1px solid ${T.border}`, background: T.white }}>
      </div>
      <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch", borderRadius: 16, border: `1px solid ${T.border}`, background: T.white, marginTop: 0 }}>
        <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 600 }}>
          <thead>
            <tr style={{ background: T.ivory }}>
              {["Client","Event","Type","Amount","Date","Method","Status",""].map(h => (
                <th key={h} style={{ padding: "11px 16px", textAlign: "left", fontSize: 11, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase" }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {shown.map((p, i) => (
              <tr key={p.id} style={{ borderBottom: `1px solid ${T.border}`, background: i % 2 === 0 ? T.white : `${T.ivory}60` }}>
                <td style={{ padding: "12px 16px", fontSize: 13, fontWeight: 600, color: T.slate }}>{p.client}</td>
                <td style={{ padding: "12px 16px", fontSize: 11, color: T.muted, maxWidth:160, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.event}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: T.slate }}>{p.type}</td>
                <td style={{ padding: "12px 16px", fontSize: 14, fontWeight: 700, color: T.deepMauve }}>${p.amount.toLocaleString()}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{p.date}</td>
                <td style={{ padding: "12px 16px", fontSize: 12, color: T.muted }}>{p.method}</td>
                <td style={{ padding: "12px 16px" }}>
                  <span style={{ background: p.status==="Paid"?"#E8F5EE":"#FFF3E0", color: p.status==="Paid"?T.success:T.warning, border:`1px solid ${p.status==="Paid"?"#B8DFD0":"#FFD9A0"}`, borderRadius:20, padding:"2px 10px", fontSize:11, fontWeight:600 }}>{p.status}</span>
                </td>
                <td style={{ padding: "12px 16px" }}>
                  {p.status === "Unpaid" && <Btn variant="gold" small>Send Link</Btn>}
                  {p.status === "Paid" && <Btn variant="ghost" small>Receipt</Btn>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── GALLERY ──────────────────────────────────────────────────────────────────
const GalleryView = () => {
  const [activeTab, setActiveTab] = useState("Portfolio");
  const tabs = ["Portfolio", "Client Uploads", "Before & After"];
  const COLORS = [T.blush, T.champagne, "#D4C4F0", "#D4EAF7", "#F0E4CC", "#C8E6C9", T.blush, T.champagne];
  const LABELS = ["Beach Proposal – Sunset", "Hotel Suite Setup", "Garden Engagement", "Luxury Floral Arch", "Rose Petal Path", "Balloon Ceiling", "Champagne Tower", "Ceremony Setup"];
  const TYPES = ["Proposal", "Proposal", "Engagement", "Wedding", "Proposal", "Proposal", "Engagement", "Wedding"];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="playfair" style={{ fontSize: 26, color: T.deepMauve }}>Photo Gallery</div>
        <div style={{ display: "flex", gap: 8 }}>
          <Btn variant="secondary">📁 Upload Photos</Btn>
          <Btn variant="primary">☁️ Supabase Storage</Btn>
        </div>
      </div>

      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {tabs.map(t => (
          <button key={t} onClick={() => setActiveTab(t)} style={{ border: `1px solid ${activeTab === t ? T.mauve : T.border}`, background: activeTab === t ? T.mauve : T.white, color: activeTab === t ? T.white : T.muted, borderRadius: 20, padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>{t}</button>
        ))}
      </div>

      {/* Supabase info banner */}
      <div style={{ background: `linear-gradient(90deg, ${T.deepMauve}15, ${T.blush}20)`, border: `1px solid ${T.blush}`, borderRadius: 12, padding: "12px 18px", marginBottom: 20, display: "flex", alignItems: "center", gap: 12 }}>
        <span style={{ fontSize: 18 }}>☁️</span>
        <div>
          <div style={{ fontSize: 13, fontWeight: 600, color: T.deepMauve }}>Connected to Supabase Storage</div>
          <div style={{ fontSize: 12, color: T.muted }}>Buckets: <code style={{ background: T.champagne, padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>portfolio</code> · <code style={{ background: T.champagne, padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>client-uploads</code> · <code style={{ background: T.champagne, padding: "1px 6px", borderRadius: 4, fontSize: 11 }}>finished-events</code></div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(140px, 1fr))", gap: 10 }}>
        {COLORS.map((color, i) => (
          <div key={i} style={{ borderRadius: 14, overflow: "hidden", border: `1px solid ${T.border}`, cursor: "pointer", transition: "transform 0.15s" }}>
            <div style={{ height: 160, background: `linear-gradient(135deg, ${color}, ${color}80)`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36 }}>
              {["🌅","🏨","🌸","💐","🌹","🎈","🥂","💒"][i]}
            </div>
            <div style={{ padding: "10px 12px", background: T.white }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: T.slate, marginBottom: 3 }}>{LABELS[i]}</div>
              <div style={{ fontSize: 10, color: T.muted }}>{TYPES[i]}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// ─── MESSAGES ─────────────────────────────────────────────────────────────────
const MessagesView = () => {
  const [activeTemplate, setActiveTemplate] = useState(null);
  const [selectedMsg, setSelectedMsg] = useState(MOCK_MESSAGES[0]);
  const [tab, setTab] = useState("inbox");

  return (
    <div>
      <div className="playfair" style={{ fontSize: 26, color: T.deepMauve, marginBottom: 20 }}>Messages & Templates</div>
      <div style={{ display: "flex", gap: 8, marginBottom: 20 }}>
        {["inbox", "templates"].map(t => (
          <button key={t} onClick={() => setTab(t)} style={{ border: `1px solid ${tab === t ? T.mauve : T.border}`, background: tab === t ? T.mauve : T.white, color: tab === t ? T.white : T.muted, borderRadius: 20, padding: "7px 18px", fontSize: 12, fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>{t === "inbox" ? "📬 Inbox" : "📝 Templates"}</button>
        ))}
      </div>

      {tab === "inbox" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <Card style={{ padding: 0, overflowY: "auto", maxHeight: 380 }}>
            {MOCK_MESSAGES.map(m => (
              <div key={m.id} onClick={() => setSelectedMsg(m)} style={{ padding: "14px 16px", borderBottom: `1px solid ${T.border}`, cursor: "pointer", background: selectedMsg?.id === m.id ? `${T.blush}25` : m.unread ? `${T.ivory}` : T.white, borderLeft: selectedMsg?.id === m.id ? `3px solid ${T.mauve}` : "3px solid transparent" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <div style={{ fontSize: 13, fontWeight: m.unread ? 700 : 500, color: T.slate }}>{m.from}</div>
                  <div style={{ fontSize: 10, color: T.muted }}>{m.time}</div>
                </div>
                <div style={{ fontSize: 12, fontWeight: 600, color: T.slate, marginBottom: 2 }}>{m.subject}</div>
                <div style={{ fontSize: 11, color: T.muted, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.preview}</div>
              </div>
            ))}
          </Card>
          <Card style={{ display: "flex", flexDirection: "column" }}>
            {selectedMsg && (
              <>
                <div style={{ paddingBottom: 14, borderBottom: `1px solid ${T.border}`, marginBottom: 16 }}>
                  <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 4 }}>{selectedMsg.subject}</div>
                  <div style={{ fontSize: 13, color: T.muted }}>From: <strong style={{ color: T.slate }}>{selectedMsg.from}</strong> · {selectedMsg.time}</div>
                </div>
                <div style={{ fontSize: 14, color: T.slate, lineHeight: 1.7, flex: 1 }}>{selectedMsg.preview} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Amber will handle this personally with care and attention to detail.</div>
                <div style={{ paddingTop: 14, borderTop: `1px solid ${T.border}`, marginTop: 16, display: "flex", gap: 8 }}>
                  <Btn variant="primary">↩ Reply</Btn>
                  <Btn variant="secondary">📝 Use Template</Btn>
                </div>
              </>
            )}
          </Card>
        </div>
      )}

      {tab === "templates" && (
        <div style={{ display: "grid", gridTemplateColumns: activeTemplate ? "280px 1fr" : "1fr", gap: 16 }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {TEMPLATES.map(t => (
              <Card key={t.id} onClick={() => setActiveTemplate(t.id === activeTemplate ? null : t.id)} style={{ cursor: "pointer", border: `1px solid ${activeTemplate === t.id ? T.mauve : T.border}`, background: activeTemplate === t.id ? `${T.blush}15` : T.white, padding: "16px 18px" }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: T.deepMauve, marginBottom: 4 }}>📧 {t.name}</div>
                <div style={{ fontSize: 11, color: T.muted }}>{t.subject}</div>
              </Card>
            ))}
            <Btn variant="ghost" style={{ justifyContent: "center" }}>+ Create Template</Btn>
          </div>
          {activeTemplate && (
            <Card>
              {(() => { const t = TEMPLATES.find(t => t.id === activeTemplate); return t ? (
                <>
                  <div className="playfair" style={{ fontSize: 20, color: T.deepMauve, marginBottom: 6 }}>{t.name}</div>
                  <div style={{ fontSize: 12, color: T.muted, marginBottom: 16 }}>Subject: {t.subject}</div>
                  <textarea style={{ width: "100%", height: 280, border: `1px solid ${T.border}`, borderRadius: 12, padding: "14px", fontSize: 13, lineHeight: 1.7, color: T.slate, background: T.ivory, resize: "vertical", fontFamily: "Inter, sans-serif", outline: "none" }} defaultValue={t.body} />
                  <div style={{ marginTop: 14, display: "flex", gap: 8 }}>
                    <Btn variant="primary">✉️ Send Now</Btn>
                    <Btn variant="secondary">💾 Save Changes</Btn>
                  </div>
                </>
              ) : null; })()}
            </Card>
          )}
        </div>
      )}
    </div>
  );
};

// ─── STAFF ────────────────────────────────────────────────────────────────────
const StaffView = () => {
  const staff = [
    { name: "Amber",  role: "Owner",   events: 60, status: "Active", color: T.gold    },
    { name: "Fern",   role: "Planner", events: 38, status: "Active", color: T.mauve   },
    { name: "Mom",    role: "Staff",   events: 22, status: "Active", color: T.blush   },
    { name: "Liz",    role: "Staff",   events: 4,  status: "Active", color: "#D4C4F0" },
    { name: "Aileen", role: "Staff",   events: 1,  status: "Active", color: "#D4EAF7" },
  ];
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div className="playfair" style={{ fontSize: 26, color: T.deepMauve }}>Staff</div>
        <Btn variant="primary">➕ Add Staff Member</Btn>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 12 }}>
        {staff.map(s => (
          <Card key={s.name} style={{ textAlign: "center", padding: "24px 16px" }}>
            <div style={{ width: 54, height: 54, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, fontWeight: 700, color: T.deepMauve, margin: "0 auto 12px" }}>{s.name[0]}</div>
            <div style={{ fontSize: 15, fontWeight: 700, color: T.slate, marginBottom: 3 }}>{s.name}</div>
            <div style={{ fontSize: 11, color: T.muted, marginBottom: 10 }}>{s.role}</div>
            <div style={{ fontSize: 13, fontWeight: 600, color: T.mauve }}>{s.events} events</div>
            <div style={{ marginTop: 12, display: "flex", gap: 4, justifyContent: "center" }}>
              <Btn variant="ghost" small>View</Btn>
            </div>
          </Card>
        ))}
      </div>
      <div style={{ marginTop: 20 }}>
        <Card>
          <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 14 }}>Jan–Jun 2026 — Staff Earnings Summary</div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(120px, 1fr))", gap: 10 }}>
            {[
              { name:"Fern",   months:[{m:"Jan",$:390},{m:"Feb",$:1040},{m:"Mar",$:440},{m:"Apr",$:700},{m:"May",$:880},{m:"Jun",$:270}], color:T.mauve  },
              { name:"Mom",    months:[{m:"Jan",$:150},{m:"Feb",$:730},{m:"Mar",$:470},{m:"Apr",$:210},{m:"May",$:200},{m:"Jun",$:50}],  color:T.blush  },
              { name:"Liz",    months:[{m:"Jan",$:0},  {m:"Feb",$:600},{m:"Mar",$:0},  {m:"Apr",$:130},{m:"May",$:130},{m:"Jun",$:0}],  color:"#D4C4F0"},
              { name:"Aileen", months:[{m:"Jan",$:0},  {m:"Feb",$:0},  {m:"Mar",$:0},  {m:"Apr",$:0},  {m:"May",$:130},{m:"Jun",$:0}],  color:"#D4EAF7"},
            ].map(s => (
              <div key={s.name}>
                <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, marginBottom: 8 }}>{s.name}</div>
                {s.months.filter(m => m.$ > 0).map(m => (
                  <div key={m.m} style={{ background: s.color + "50", borderRadius: 8, padding: "7px 10px", marginBottom: 6, borderLeft: `3px solid ${s.color}` }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: T.deepMauve }}>{m.m}</div>
                    <div style={{ fontSize: 12, fontWeight: 700, color: T.mauve }}>${m.$.toLocaleString()}</div>
                  </div>
                ))}
                <div style={{ fontSize: 12, fontWeight: 700, color: T.gold, marginTop: 6 }}>
                  Total: ${s.months.reduce((a,b) => a+b.$, 0).toLocaleString()}
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

// ─── DB SCHEMA ────────────────────────────────────────────────────────────────
const SchemaView = () => {
  const tables = [
    { name: "users", color: T.mauve, fields: ["id uuid PK", "email text UNIQUE", "full_name text", "role enum(owner,planner,staff,client)", "avatar_url text", "created_at timestamptz", "updated_at timestamptz"] },
    { name: "clients", color: "#7C5CBF", fields: ["id uuid PK", "user_id uuid FK→users", "name text", "email text", "phone text", "event_type text", "budget numeric", "notes text", "status enum(inquiry,pending,booked,completed)", "created_at timestamptz"] },
    { name: "events", color: T.gold, fields: ["id uuid PK", "client_id uuid FK→clients", "package_id uuid FK→packages", "title text", "event_type text", "event_date date", "start_time time", "setup_time time", "cleanup_time time", "location text", "status enum(inquiry,pending,confirmed,completed,cancelled)", "deposit_paid boolean", "balance_due numeric", "notes text", "created_at timestamptz"] },
    { name: "packages", color: T.success, fields: ["id uuid PK", "name text", "category text", "price numeric", "description text", "includes text[]", "addons jsonb", "is_active boolean", "created_at timestamptz"] },
    { name: "package_images", color: "#4CAF84", fields: ["id uuid PK", "package_id uuid FK→packages", "storage_path text", "alt_text text", "sort_order int", "created_at timestamptz"] },
    { name: "bookings", color: T.warning, fields: ["id uuid PK", "client_id uuid FK→clients", "event_id uuid FK→events", "package_id uuid FK→packages", "total_price numeric", "deposit_amount numeric", "balance_due numeric", "signed_at timestamptz", "created_at timestamptz"] },
    { name: "payments", color: "#E87040", fields: ["id uuid PK", "booking_id uuid FK→bookings", "client_id uuid FK→clients", "stripe_payment_id text", "amount numeric", "type enum(deposit,balance,refund,tip)", "status enum(paid,unpaid,refunded)", "paid_at timestamptz", "due_date date", "created_at timestamptz"] },
    { name: "messages", color: T.blush, fields: ["id uuid PK", "from_user_id uuid FK→users", "to_user_id uuid FK→users", "client_id uuid FK→clients", "subject text", "body text", "channel enum(email,sms,instagram,facebook)", "is_read boolean", "sent_at timestamptz"] },
    { name: "staff", color: "#5C9BD6", fields: ["id uuid PK", "user_id uuid FK→users", "event_id uuid FK→events", "role text", "confirmed boolean", "notes text"] },
    { name: "tasks", color: "#7CB342", fields: ["id uuid PK", "event_id uuid FK→events", "assigned_to uuid FK→users", "title text", "due_date date", "completed boolean", "priority enum(low,medium,high)"] },
    { name: "vendors", color: "#BA68C8", fields: ["id uuid PK", "name text", "category text", "email text", "phone text", "notes text", "rating int", "created_at timestamptz"] },
    { name: "reviews", color: T.gold, fields: ["id uuid PK", "client_id uuid FK→clients", "event_id uuid FK→events", "rating int", "body text", "is_public boolean", "created_at timestamptz"] },
  ];

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <div className="playfair" style={{ fontSize: 26, color: T.deepMauve }}>Supabase DB Schema</div>
        <Btn variant="secondary">📋 Copy SQL</Btn>
      </div>
      <div style={{ fontSize: 13, color: T.muted, marginBottom: 20 }}>All {tables.length} tables · special-day-planner database · Row Level Security enabled</div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
        {tables.map(t => (
          <Card key={t.name} style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: t.color, flexShrink: 0 }} />
              <code style={{ fontSize: 14, fontWeight: 700, color: T.slate }}>{t.name}</code>
            </div>
            {t.fields.map(f => {
              const [fname, ...rest] = f.split(" ");
              const ftype = rest.join(" ");
              return (
                <div key={f} style={{ display: "flex", justifyContent: "space-between", padding: "4px 0", borderBottom: `1px solid ${T.border}`, fontSize: 11 }}>
                  <code style={{ color: T.deepMauve, fontWeight: ftype.includes("PK") ? 700 : 400 }}>{fname}</code>
                  <span style={{ color: ftype.includes("FK") ? T.mauve : T.muted, fontSize: 10 }}>{ftype}</span>
                </div>
              );
            })}
          </Card>
        ))}
      </div>

      {/* GitHub workflow */}
      <Card style={{ marginTop: 20 }}>
        <div className="playfair" style={{ fontSize: 18, color: T.deepMauve, marginBottom: 14 }}>GitHub Workflow</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 14 }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>Branch Strategy</div>
            {[["main", "Live / production", T.success], ["dev", "Integration testing", T.warning], ["feature/calendar", "In progress", T.mauve], ["feature/packages", "Planned", T.muted], ["feature/payments", "Planned", T.muted]].map(([branch, desc, color]) => (
              <div key={branch} style={{ display: "flex", gap: 10, padding: "8px 0", borderBottom: `1px solid ${T.border}` }}>
                <code style={{ fontSize: 12, color: T.deepMauve, background: T.champagne, padding: "2px 8px", borderRadius: 6, flexShrink: 0 }}>{branch}</code>
                <span style={{ fontSize: 12, color }}>→ {desc}</span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: T.muted, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 8 }}>CI/CD Actions</div>
            {["✅ ESLint + Prettier on PR", "🧪 Vitest unit tests", "🚀 Auto-deploy to Vercel (main)", "🗄️ Supabase migration runner", "🔒 Secrets scan before merge"].map(a => (
              <div key={a} style={{ fontSize: 12, color: T.slate, padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>{a}</div>
            ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

// ─── LOGIN ────────────────────────────────────────────────────────────────────
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!email) return;
    setLoading(true);
    setTimeout(() => { setLoading(false); onLogin({ name: "Amber", role: "Owner", email }); }, 1000);
  };

  return (
    <div style={{ minHeight: "100vh", background: `linear-gradient(135deg, ${T.deepMauve} 0%, ${T.mauve} 50%, ${T.blush} 100%)`, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 420 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: T.blush, letterSpacing: 4, textTransform: "uppercase", marginBottom: 8 }}>Welcome to</div>
          <div className="playfair" style={{ fontSize: 38, color: T.white, lineHeight: 1.2, marginBottom: 4 }}>Special Day</div>
          <div className="playfair" style={{ fontSize: 38, color: T.champagne, fontStyle: "italic", lineHeight: 1.2 }}>Planner</div>
          <div style={{ marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Business Dashboard</div>
        </div>
        <div style={{ background: "rgba(255,255,255,0.1)", backdropFilter: "blur(20px)", borderRadius: 20, padding: "36px 32px", border: "1px solid rgba(255,255,255,0.15)" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 0.8, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="amber@specialdayplanner.com" style={{ width: "100%", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 16px", fontSize: 14, background: "rgba(255,255,255,0.08)", color: T.white, outline: "none" }} />
            </div>
            <div>
              <label style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.6)", letterSpacing: 0.8, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Password</label>
              <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" style={{ width: "100%", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 12, padding: "12px 16px", fontSize: 14, background: "rgba(255,255,255,0.08)", color: T.white, outline: "none" }} />
            </div>
            <button onClick={handleLogin} disabled={loading} style={{ background: `linear-gradient(135deg, ${T.gold}, #B8922A)`, border: "none", borderRadius: 12, padding: "14px", fontSize: 15, fontWeight: 700, color: T.white, cursor: "pointer", marginTop: 8 }}>
              {loading ? "Signing in…" : "✨ Sign In"}
            </button>
          </div>
          <div style={{ textAlign: "center", marginTop: 18, fontSize: 12, color: "rgba(255,255,255,0.4)" }}>
            Demo: use any email · Protected by Supabase Auth
          </div>
        </div>
        <div style={{ textAlign: "center", marginTop: 16, fontSize: 11, color: "rgba(255,255,255,0.3)" }}>Roles: Owner · Planner · Staff · Client</div>
      </div>
    </div>
  );
};

// ─── APP ROOT ─────────────────────────────────────────────────────────────────
export default function App() {
  const [user, setUser] = useState(null);
  const [page, setPage] = useState("dashboard");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const style = document.createElement("style");
    style.textContent = GLOBAL_CSS;
    document.head.appendChild(style);
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => { document.head.removeChild(style); window.removeEventListener("resize", onResize); };
  }, []);

  const navigate = (id) => { setPage(id); setDrawerOpen(false); };

  if (!user) return <Login onLogin={setUser} />;

  const PAGES = {
    dashboard: <Dashboard onNav={navigate} />,
    calendar:  <CalendarView />,
    events:    <EventsList />,
    clients:   <ClientsView />,
    packages:  <PackagesView />,
    booking:   <BookingForm />,
    payments:  <PaymentsView />,
    gallery:   <GalleryView />,
    messages:  <MessagesView />,
    staff:     <StaffView />,
    schema:    <SchemaView />,
  };

  const pageLabel = [...NAV_PRIMARY, ...NAV_MORE].find(n => n.id === page)?.label || "Dashboard";

  if (isMobile) {
    return (
      <div style={{ display: "flex", flexDirection: "column", height: "100dvh", background: T.ivory, overflow: "hidden" }}>
        {/* Mobile top bar */}
        <div style={{ background: T.deepMauve, padding: "14px 18px 12px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0, paddingTop: "calc(14px + env(safe-area-inset-top, 0px))" }}>
          <div>
            <div style={{ fontSize: 9, fontWeight: 700, color: T.blush, letterSpacing: 2, textTransform: "uppercase" }}>Special Day</div>
            <div className="playfair" style={{ fontSize: 16, color: T.white, lineHeight: 1 }}>Planner</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span className="playfair" style={{ fontSize: 14, color: T.champagne, fontStyle: "italic" }}>{pageLabel}</span>
            <div style={{ width: 32, height: 32, borderRadius: "50%", background: `linear-gradient(135deg, ${T.blush}, ${T.gold})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 700, color: T.deepMauve }}>{user.name[0]}</div>
          </div>
        </div>

        {/* Scrollable content */}
        <div className="sdp-scroll" style={{ flex: 1, overflowY: "auto", padding: "16px 14px 80px" }}>
          {PAGES[page] || <Dashboard onNav={navigate} />}
        </div>

        {/* Bottom nav */}
        <BottomNav active={page} onNav={navigate} onMore={() => setDrawerOpen(true)} />

        {/* Drawer */}
        {drawerOpen && <MobileDrawer active={page} onNav={navigate} onClose={() => setDrawerOpen(false)} user={user} />}
      </div>
    );
  }

  // Desktop layout
  return (
    <div style={{ display: "flex", height: "100vh", background: T.ivory, overflow: "hidden" }}>
      <Sidebar active={page} onNav={navigate} user={user} />
      <main className="sdp-scroll" style={{ marginLeft: 220, flex: 1, padding: "28px 32px", overflowY: "auto" }}>
        {PAGES[page] || <Dashboard onNav={navigate} />}
      </main>
    </div>
  );
}
