  import {
    shallowMount
  } from '@vue/test-utils'
  import ProgressBar from '../ProgressBar.vue'

  describe('ProgressBar.vue', () => {
    beforeEach(() => {
      1
      jest.useFakeTimers()
    })
    test('is hidden on initial render', () => {
      const wrapper = shallowMount(ProgressBar)
      expect(wrapper.classes()).toContain('hidden')
    })
    test('initializes with 0% width', () => {
      const wrapper = shallowMount(ProgressBar)
      expect(wrapper.element.style.width).toBe('0%')
    })
    test('displays the bar when start is called', async () => {
      const wrapper = shallowMount(ProgressBar)
      expect(wrapper.classes()).toContain('hidden')
      wrapper.vm.start()
      await wrapper.vm.$nextTick()
      expect(wrapper.classes()).not.toContain('hidden')
    })
    test('sets the bar to 100% width when finish is called', async () => {
      const wrapper = shallowMount(ProgressBar)
      wrapper.vm.start()
      wrapper.vm.finish()
      await wrapper.vm.$nextTick()
      expect(wrapper.element.style.width).toBe('100%')
    })
    test('hides the bar when finish is called', () => {
      const wrapper = shallowMount(ProgressBar)
      wrapper.vm.start()
      wrapper.vm.finish()
      expect(wrapper.classes()).toContain('hidden')
    })

    test('increases width by 1% every 100ms after start call', async() => {
      const wrapper = shallowMount(ProgressBar)
      wrapper.vm.start()
      jest.runTimersToTime(100)
      await wrapper.vm.$nextTick()
      expect(wrapper.element.style.width).toBe('1%')
      jest.runTimersToTime(900)
      await wrapper.vm.$nextTick()
      expect(wrapper.element.style.width).toBe('10%')
      jest.runTimersToTime(4000)
      await wrapper.vm.$nextTick()
      expect(wrapper.element.style.width).toBe('50%')
    })

    test('clears timer when finish is called', () => {
      jest.spyOn(window, 'clearInterval')
      setInterval.mockReturnValue(123)
      const wrapper = shallowMount(ProgressBar)
      wrapper.vm.start()
      wrapper.vm.finish()
      expect(window.clearInterval).toHaveBeenCalledWith(123)
    })
    // 179
  })
