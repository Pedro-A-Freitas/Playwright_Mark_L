import { Page, expect, Locator } from "@playwright/test"
import { taskModel } from "../../../fixtures/task.model"

export class TasksPage {
    readonly page: Page
    readonly inputTaskName: Locator

    constructor(page: Page) {
        this.page = page
        this.inputTaskName = page.locator('input[placeholder="Add a new Task"]')
    }

    async go() {
        await this.page.goto('/')
    }

    async create(task: taskModel) {
        await this.inputTaskName.fill(task.name)

        await this.page.click('button >> text=Create')
    }

    async toggle(taskName) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class, "Toggle")]`)
        await target.click()
    }

    async remove(taskName) {
        const target = this.page.locator(`//p[text()="${taskName}"]/..//button[contains(@class, "Delete")]`)
        await target.click()
    }

    async shouldHaveText(taskName: string) {
        const target = this.page.locator('.task-item p >> text=' + taskName)
        await expect(target).toBeVisible()
    }

    async shouldNotExist(taskName: string) {
        const target = this.page.locator('.task-item p >> text=' + taskName)
        await expect(target).not.toBeVisible()
    }

    async alertHaveText(text: string) {
        const target = this.page.locator('.swal2-html-container')
        await expect(target).toHaveText(text)
    }

    async shouldBeDone(taskName: string) {
        const target = this.page.getByText(taskName)
        await expect(target).toHaveCSS('text-decoration-line', 'line-through')
    }

}