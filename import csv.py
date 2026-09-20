import csv
import os

FILE_NAME = "contacts.csv"


# Create the CSV file if it does not exist
def initialize_file():
    if not os.path.exists(FILE_NAME):
        with open(FILE_NAME, "w", newline="") as file:
            writer = csv.writer(file)
            writer.writerow(["Name", "Phone", "Email"])


# CREATE - Add a new contact
def create_contact():
    name = input("Enter name: ")
    phone = input("Enter phone number: ")
    email = input("Enter email: ")

    with open(FILE_NAME, "a", newline="") as file:
        writer = csv.writer(file)
        writer.writerow([name, phone, email])

    print("Contact added successfully!")


# READ - Display all contacts
def read_contacts():
    with open(FILE_NAME, "r", newline="") as file:
        reader = csv.DictReader(file)

        contacts = list(reader)

        if not contacts:
            print("No contacts found.")
            return

        print("\n--- Contact List ---")

        for contact in contacts:
            print("Name :", contact["Name"])
            print("Phone:", contact["Phone"])
            print("Email:", contact["Email"])
            print("--------------------")


# UPDATE - Update a contact
def update_contact():
    search_name = input("Enter the name of the contact to update: ")

    with open(FILE_NAME, "r", newline="") as file:
        reader = csv.DictReader(file)
        contacts = list(reader)

    found = False

    for contact in contacts:
        if contact["Name"].lower() == search_name.lower():
            print("Enter new details:")

            contact["Name"] = input("Enter new name: ")
            contact["Phone"] = input("Enter new phone number: ")
            contact["Email"] = input("Enter new email: ")

            found = True
            break

    if found:
        with open(FILE_NAME, "w", newline="") as file:
            fieldnames = ["Name", "Phone", "Email"]
            writer = csv.DictWriter(file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(contacts)

        print("Contact updated successfully!")
    else:
        print("Contact not found.")


# DELETE - Delete a contact
def delete_contact():
    search_name = input("Enter the name of the contact to delete: ")

    with open(FILE_NAME, "r", newline="") as file:
        reader = csv.DictReader(file)
        contacts = list(reader)

    new_contacts = []
    found = False

    for contact in contacts:
        if contact["Name"].lower() == search_name.lower():
            found = True
        else:
            new_contacts.append(contact)

    if found:
        with open(FILE_NAME, "w", newline="") as file:
            fieldnames = ["Name", "Phone", "Email"]
            writer = csv.DictWriter(file, fieldnames=fieldnames)

            writer.writeheader()
            writer.writerows(new_contacts)

        print("Contact deleted successfully!")
    else:
        print("Contact not found.")


# Main menu
def main():
    initialize_file()

    while True:
        print("\n===== CONTACT MANAGEMENT SYSTEM =====")
        print("1. Create Contact")
        print("2. Read Contacts")
        print("3. Update Contact")
        print("4. Delete Contact")
        print("5. Exit")

        choice = input("Enter your choice: ")

        if choice == "1":
            create_contact()

        elif choice == "2":
            read_contacts()

        elif choice == "3":
            update_contact()

        elif choice == "4":
            delete_contact()

        elif choice == "5":
            print("Thank you for using Contact Management System!")
            break

        else:
            print("Invalid choice. Please try again.")


# Start the program
main()