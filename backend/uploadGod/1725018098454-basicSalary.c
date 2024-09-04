#include <stdio.h>

int main() {
    float basic_salary, dearness_allowance, house_rent_allowance, gross_salary;

    // Input basic salary from the user
    // printf("Enter the basic salary: ");
    scanf("%f", &basic_salary);

    // Calculate dearness allowance (60% of basic salary)
    dearness_allowance = 0.60 * basic_salary;

    // Calculate house rent allowance (15% of basic salary)
    house_rent_allowance = 0.15 * basic_salary;

    // Calculate gross salary
    gross_salary = basic_salary + dearness_allowance + house_rent_allowance;

    // Display the result
    // printf("\nBasic Salary: %.2f\n", basic_salary);
    // printf("Dearness Allowance: %.2f\n", dearness_allowance);
    // printf("House Rent Allowance: %.2f\n", house_rent_allowance);
    printf("%.2f", gross_salary);

    return 0;
}
